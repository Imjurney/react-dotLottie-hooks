import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottie } from "@lottiefiles/dotlottie-react";
import { gsap } from "gsap";
import DEBUG_LANGUAGE from "./language";

const detectSSRFramework = () => {
  if (!isClient)
    return { isNextJS: false, isRemix: false, isSSRFramework: false };

  try {
    const isNextJS = !!(window as any).__NEXT_DATA__;

    let isRemix = false;

    if (document.readyState !== "loading") {
      isRemix = !!(
        (window as any).__remixContext ||
        (window as any).__remixRouteModules ||
        (window as any).__remixManifest ||
        document.querySelector("script[data-remix]") ||
        document.querySelector("[data-remix-root]")
      );
    }

    return {
      isNextJS,
      isRemix,
      isSSRFramework: isNextJS || isRemix,
    };
  } catch (error) {
    const tempMsg = DEBUG_LANGUAGE["ko"]; // 임시로 기본 언어 사용
    console.warn(tempMsg.initialFrameworkDetectionFailed, error);
    return { isNextJS: false, isRemix: false, isSSRFramework: false };
  }
};

const isClient = typeof window !== "undefined";

let detectedFramework = {
  isNextJS: false,
  isRemix: false,
  isSSRFramework: false,
};

if (isClient) {
  try {
    detectedFramework = detectSSRFramework();
    gsap.registerPlugin(ScrollTrigger);
  } catch (error) {
    const tempMsg = DEBUG_LANGUAGE["ko"]; // 임시로 기본 언어 사용
    console.warn(tempMsg.initialGSAPInitFailed, error);
  }
}

const { isSSRFramework } = detectedFramework;

export interface UseLottieScrollTriggerOptions {
  // Common ScrollTrigger options
  start?: string;
  end?: string;
  markers?: boolean;
  pauseOnLoad?: boolean;
  debug?: boolean;
  debugLanguage?: "ko" | "en";

  // SSR/CSR related options
  strictMode?: boolean;
  waitForDOMReady?: boolean;

  // Performance optimization options (re-rendering control)
  enableStateTracking?: boolean; // Whether to track isPlaying/currentFrame with React state (default: false, performance first)
  frameUpdateThrottle?: number; // Frame update throttle (ms, default: 100)
  onPlayStateChange?: (isPlaying: boolean) => void; // play/pause state change callback
  onFrameChange?: (currentFrame: number) => void; // Frame change callback (throttled)

  // DotLottie event callbacks
  onEnter?: (dotLottie: DotLottie) => void;
  onLeave?: (dotLottie: DotLottie) => void;
  onEnterBack?: (dotLottie: DotLottie) => void;
  onLeaveBack?: (dotLottie: DotLottie) => void;

  // GSAP animation options
  gsapAnimations?: {
    rotation?: number;
    scale?: number;
    x?: number;
    y?: number;
    opacity?: number;
    duration?: number;
    ease?: string;
    trigger?: "enter" | "enterBack" | "leave" | "leaveBack" | "scroll";
    scrub?: boolean | number;
  };

  // Additional GSAP ScrollTrigger options
  scrollTriggerOptions?: Partial<ScrollTrigger.StaticVars>;
}

export interface UseLottieScrollTriggerReturn {
  // Common refs and states
  triggerRef: React.RefObject<HTMLDivElement>;
  lottieContainerRef: React.RefObject<HTMLDivElement>;
  isMounted: boolean;
  isDOMReady: boolean;
  isClient: boolean;
  isLoaded: boolean;

  // DotLottie specific
  handleDotLottieRef: (dotLottie: DotLottie | null) => void;
  dotLottie: DotLottie | null;
  isDotLottieLoaded: boolean;

  // Common control functions
  play: () => void;
  pause: () => void;
  stop: () => void;
  setFrame: (frame: number) => void;

  // Animation state - ref-based getters (no re-rendering)
  getCurrentFrame: () => number; // ref-based getter
  getIsPlaying: () => boolean; // ref-based getter

  // React state based (updated only when enableStateTracking is true)
  isPlaying: boolean; // always false if enableStateTracking is false
  currentFrame: number; // always 0 if enableStateTracking is false

  // Environment info
  isSSRFramework: boolean;
}

export const useLottieScrollTrigger = (
  options: UseLottieScrollTriggerOptions = {}
): UseLottieScrollTriggerReturn => {
  const {
    start = "top center",
    end = "bottom 20%",
    markers = process.env.NODE_ENV === "development",
    pauseOnLoad = true,
    debug = false,
    debugLanguage = "ko",
    strictMode = isSSRFramework,
    waitForDOMReady = isSSRFramework,

    // Performance optimization options
    enableStateTracking = false, // Default: false (performance first)
    frameUpdateThrottle = 100,
    onPlayStateChange,
    onFrameChange,

    // DotLottie callbacks
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,

    // Common options
    gsapAnimations,
    scrollTriggerOptions,
  } = options;

  // Common states
  const [isMounted, setIsMounted] = useState(false);
  const [isDOMReady, setIsDOMReady] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);

  // DotLottie specific states
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [isDotLottieLoaded, setIsDotLottieLoaded] = useState(false);

  // Ref-based animation state (no re-rendering)
  const playStateRef = useRef(false);
  const frameRef = useRef(0);

  // React state based (optional tracking)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Refs for throttling
  const lastUpdateTimeRef = useRef(0);
  const lastPlayTimeRef = useRef(0); // play-specific debounce
  const lastPauseTimeRef = useRef(0); // pause-specific debounce

  // Ref-based getter functions
  const getCurrentFrame = useCallback(() => frameRef.current, []);
  const getIsPlaying = useCallback(() => playStateRef.current, []);

  const msg = DEBUG_LANGUAGE[debugLanguage] || DEBUG_LANGUAGE["ko"];

  // Mount and DOM ready state management
  useEffect(() => {
    if (isClient) {
      setIsMounted(true);

      if (waitForDOMReady) {
        const checkDOMReady = () => {
          if (
            document.readyState === "complete" ||
            document.readyState === "interactive"
          ) {
            setIsDOMReady(true);

            // Re-detect framework after DOM is ready (for more accurate detection)
            try {
              const redetected = detectSSRFramework();
              if (
                debug &&
                redetected.isSSRFramework !== detectedFramework.isSSRFramework
              ) {
                console.log(msg.frameworkDetectionUpdated, redetected);
              }
            } catch (error) {
              if (debug) console.warn(msg.frameworkReDetectionFailed, error);
            }
          } else {
            const handleDOMContentLoaded = () => {
              setIsDOMReady(true);

              // Re-detect framework after DOM load
              try {
                const redetected = detectSSRFramework();
                if (
                  debug &&
                  redetected.isSSRFramework !== detectedFramework.isSSRFramework
                ) {
                  console.log(
                    msg.frameworkDetectionUpdatedAfterDOM,
                    redetected
                  );
                }
              } catch (error) {
                if (debug)
                  console.warn(msg.frameworkReDetectionAfterDOMFailed, error);
              }
            };

            const handleLoad = () => setIsDOMReady(true);

            document.addEventListener(
              "DOMContentLoaded",
              handleDOMContentLoaded
            );
            window.addEventListener("load", handleLoad);

            return () => {
              document.removeEventListener(
                "DOMContentLoaded",
                handleDOMContentLoaded
              );
              window.removeEventListener("load", handleLoad);
            };
          }
        };

        checkDOMReady();
      } else {
        setIsDOMReady(true);
      }
    }
  }, [waitForDOMReady, debug]);

  // DotLottie ref handler
  const handleDotLottieRef = useCallback(
    (dotLottieInstance: DotLottie | null) => {
      if (dotLottieInstance) {
        if (debug) console.log(msg.dotLottieSet, dotLottieInstance);
        setDotLottie(dotLottieInstance);

        const handleLoad = () => {
          if (debug) console.log(msg.loadComplete);
          setIsDotLottieLoaded(true);

          if (pauseOnLoad) {
            setTimeout(() => {
              dotLottieInstance.pause();
            }, 100);
          }
        };

        const handleLoadError = (error: any) => {
          console.error(msg.loadError, error);
        };

        // Performance-optimized event listeners
        const handlePlay = () => {
          playStateRef.current = true;

          // Optional React state update
          if (enableStateTracking) {
            setIsPlaying(true);
          }

          // Call callback
          onPlayStateChange?.(true);

          if (debug) console.log(msg.dotLottiePlayEvent);
        };

        const handlePause = () => {
          playStateRef.current = false;

          // Optional React state update
          if (enableStateTracking) {
            setIsPlaying(false);
          }

          // Call callback
          onPlayStateChange?.(false);

          if (debug) console.log(msg.dotLottiePauseEvent);
        };

        const handleStop = () => {
          playStateRef.current = false;
          frameRef.current = 0;

          // Optional React state update
          if (enableStateTracking) {
            setIsPlaying(false);
            setCurrentFrame(0);
          }

          // Call callbacks
          onPlayStateChange?.(false);
          onFrameChange?.(0);

          if (debug) console.log(msg.dotLottieStopEvent);
        };

        // Frame update with throttling
        const handleFrame = (event: any) => {
          const now = Date.now();
          const newFrame = Math.round(event.currentFrame || 0);

          // Always update ref (no throttling)
          frameRef.current = newFrame;

          // Throttled updates
          if (now - lastUpdateTimeRef.current > frameUpdateThrottle) {
            // Optional React state update
            if (enableStateTracking) {
              setCurrentFrame(newFrame);
            }

            // Call callback
            onFrameChange?.(newFrame);

            lastUpdateTimeRef.current = now;
          }
        };

        dotLottieInstance.addEventListener("load", handleLoad);
        dotLottieInstance.addEventListener("loadError", handleLoadError);
        dotLottieInstance.addEventListener("play", handlePlay);
        dotLottieInstance.addEventListener("pause", handlePause);
        dotLottieInstance.addEventListener("stop", handleStop);

        // Register frame event conditionally for performance optimization
        if (debug || enableStateTracking || onFrameChange) {
          dotLottieInstance.addEventListener("frame", handleFrame);
        }

        if (dotLottieInstance.isLoaded) {
          handleLoad();
        }

        // Initial state synchronization
        const initialPlaying = dotLottieInstance.isPlaying || false;
        const initialFrame = Math.round(dotLottieInstance.currentFrame || 0);

        // Update refs
        playStateRef.current = initialPlaying;
        frameRef.current = initialFrame;

        // Optional React state update
        if (enableStateTracking) {
          setIsPlaying(initialPlaying);
          setCurrentFrame(initialFrame);
        }

        return () => {
          dotLottieInstance.removeEventListener("load", handleLoad);
          dotLottieInstance.removeEventListener("loadError", handleLoadError);
          dotLottieInstance.removeEventListener("play", handlePlay);
          dotLottieInstance.removeEventListener("pause", handlePause);
          dotLottieInstance.removeEventListener("stop", handleStop);

          if (debug || enableStateTracking || onFrameChange) {
            dotLottieInstance.removeEventListener("frame", handleFrame);
          }
        };
      } else {
        // Reset state when DotLottie instance is null
        setDotLottie(null);
        setIsDotLottieLoaded(false);
        setIsPlaying(false);
        setCurrentFrame(0);
      }
    },
    [debug, pauseOnLoad, msg]
  );

  // GSAP animation execution function
  const executeGsapAnimation = useCallback(
    (trigger: string) => {
      if (!isClient || !gsapAnimations || !lottieContainerRef.current) return;

      const {
        rotation = 0,
        scale = 1,
        x = 0,
        y = 0,
        opacity = 1,
        duration = 1,
        ease = "power2.out",
        trigger: animationTrigger = "enter",
      } = gsapAnimations;

      if (animationTrigger === trigger) {
        if (debug)
          console.log(msg.gsapAnimationExecution(trigger), gsapAnimations);

        gsap.to(lottieContainerRef.current, {
          rotation,
          scale,
          x,
          y,
          opacity,
          duration,
          ease,
        });
      }
    },
    [gsapAnimations, debug]
  );

  // DotLottie default event handlers
  const defaultOnEnter = useCallback(
    (dotLottie: DotLottie) => {
      if (debug) console.log(msg.scrollEnter);
      try {
        dotLottie.setFrame(0);
        dotLottie.play();
        if (debug) console.log(msg.playSuccess);
      } catch (error) {
        console.error(msg.playError, error);
      }
    },
    [debug, msg]
  );

  const defaultOnLeave = useCallback(
    (dotLottie: DotLottie) => {
      if (debug) console.log(msg.scrollLeave);
      try {
        dotLottie.pause();
      } catch (error) {
        console.error(msg.pauseError, error);
      }
    },
    [debug, msg]
  );

  const defaultOnEnterBack = useCallback(
    (dotLottie: DotLottie) => {
      if (debug) console.log(msg.scrollEnterBack);
      try {
        dotLottie.play();
      } catch (error) {
        console.error(msg.playError, error);
      }
    },
    [debug, msg]
  );

  const defaultOnLeaveBack = useCallback(
    (dotLottie: DotLottie) => {
      if (debug) console.log(msg.scrollLeaveBack);
      try {
        dotLottie.pause();
      } catch (error) {
        console.error(msg.pauseError, error);
      }
    },
    [debug, msg]
  );

  // ScrollTrigger event handlers
  const createScrollTriggerHandlers = useCallback(() => {
    if (dotLottie) {
      return {
        onEnter: () => {
          const handler = onEnter || defaultOnEnter;
          handler(dotLottie);
          executeGsapAnimation("enter");
        },
        onLeave: () => {
          const handler = onLeave || defaultOnLeave;
          handler(dotLottie);
          executeGsapAnimation("leave");
        },
        onEnterBack: () => {
          const handler = onEnterBack || defaultOnEnterBack;
          handler(dotLottie);
          executeGsapAnimation("enterBack");
        },
        onLeaveBack: () => {
          const handler = onLeaveBack || defaultOnLeaveBack;
          handler(dotLottie);
          executeGsapAnimation("leaveBack");
        },
      };
    }
    return {};
  }, [
    dotLottie,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    defaultOnEnter,
    defaultOnLeave,
    defaultOnEnterBack,
    defaultOnLeaveBack,
    executeGsapAnimation,
  ]);

  // ScrollTrigger setup
  useGSAP(() => {
    if (!isClient) {
      if (debug) console.log(msg.ssrEnvironmentMessage);
      return;
    }

    // Condition check
    const isAnimationReady = dotLottie && isDotLottieLoaded;
    const basicConditions = isMounted && isAnimationReady && triggerRef.current;
    const strictConditions = strictMode
      ? isDOMReady && document.readyState === "complete"
      : true;

    if (!basicConditions || !strictConditions) {
      if (debug) {
        console.log(msg.conditionNotMet, {
          isMounted,
          isAnimationReady,
          triggerRef: !!triggerRef.current,
          ...(strictMode && {
            isDOMReady,
            documentReady: document.readyState === "complete",
          }),
        });
      }
      return;
    }

    if (debug) console.log(msg.scrollTriggerStart);

    // ScrollTrigger refresh
    if (ScrollTrigger) {
      ScrollTrigger.refresh();
    }

    const handlers = createScrollTriggerHandlers();

    // ScrollTrigger configuration
    const scrollTriggerConfig: ScrollTrigger.StaticVars = {
      trigger: triggerRef.current,
      start,
      end,
      markers,
      ...handlers,
      ...(scrollTriggerOptions || {}),
    };

    // Add scrub option if present in GSAP animations
    if (gsapAnimations?.scrub !== undefined) {
      scrollTriggerConfig.scrub = gsapAnimations.scrub;
    }

    const trigger = ScrollTrigger.create(scrollTriggerConfig);

    return () => {
      trigger.kill();
      if (debug) console.log(msg.scrollTriggerDestroy);
    };
  }, [
    isMounted,
    dotLottie,
    isDotLottieLoaded,
    isDOMReady,
    strictMode,
    start,
    end,
    markers,
    createScrollTriggerHandlers,
    debug,
    msg,
    scrollTriggerOptions,
    gsapAnimations,
  ]);

  // Common control functions (with debounce and callbacks)
  const play = useCallback(() => {
    if (!dotLottie || !isDotLottieLoaded) {
      if (debug) console.warn(msg.dotLottieNotLoaded);
      return;
    }

    // debounce: prevent duplicate calls within 100ms
    const now = Date.now();
    if (now - lastPlayTimeRef.current < 100) {
      if (debug) console.log(msg.playThrottled);
      return;
    }
    lastPlayTimeRef.current = now;

    try {
      dotLottie.play();

      // Immediately update ref state
      playStateRef.current = true;

      // Optional React state update
      if (enableStateTracking) {
        setIsPlaying(true);
      }

      // Call callback
      onPlayStateChange?.(true);

      if (debug) console.log(msg.playExecuted);
    } catch (error) {
      console.error(msg.playExecutionError, error);
    }
  }, [
    dotLottie,
    isDotLottieLoaded,
    enableStateTracking,
    onPlayStateChange,
    debug,
  ]);

  const pause = useCallback(() => {
    if (!dotLottie || !isDotLottieLoaded) {
      if (debug) console.warn(msg.dotLottieNotLoaded);
      return;
    }

    // debounce: prevent duplicate calls within 100ms
    const now = Date.now();
    if (now - lastPauseTimeRef.current < 100) {
      if (debug) console.log(msg.pauseThrottled);
      return;
    }
    lastPauseTimeRef.current = now;

    try {
      dotLottie.pause();

      // Immediately update ref state
      playStateRef.current = false;

      // Optional React state update
      if (enableStateTracking) {
        setIsPlaying(false);
      }

      // Call callback
      onPlayStateChange?.(false);

      if (debug) console.log(msg.pauseExecuted);
    } catch (error) {
      console.error(msg.pauseExecutionError, error);
    }
  }, [
    dotLottie,
    isDotLottieLoaded,
    enableStateTracking,
    onPlayStateChange,
    debug,
  ]);

  const stop = useCallback(() => {
    if (!dotLottie || !isDotLottieLoaded) {
      if (debug) console.warn(msg.dotLottieNotLoaded);
      return;
    }

    // debounce: prevent duplicate calls within 100ms
    const now = Date.now();
    if (now - lastPauseTimeRef.current < 100) {
      if (debug) console.log(msg.stopThrottled);
      return;
    }
    lastPauseTimeRef.current = now;

    try {
      dotLottie.stop();

      // Immediately update ref state
      playStateRef.current = false;
      frameRef.current = 0;

      // Optional React state update
      if (enableStateTracking) {
        setIsPlaying(false);
        setCurrentFrame(0);
      }

      // Call callbacks
      onPlayStateChange?.(false);
      onFrameChange?.(0);

      if (debug) console.log(msg.stopExecuted);
    } catch (error) {
      console.error(msg.stopExecutionError, error);
    }
  }, [
    dotLottie,
    isDotLottieLoaded,
    enableStateTracking,
    onPlayStateChange,
    onFrameChange,
    debug,
  ]);

  const setFrame = useCallback(
    (frame: number) => {
      if (!dotLottie || !isDotLottieLoaded) {
        if (debug) console.warn(msg.dotLottieNotLoaded);
        return;
      }

      try {
        dotLottie.setFrame(frame);

        // Immediately update ref state
        frameRef.current = frame;

        // Optional React state update
        if (enableStateTracking) {
          setCurrentFrame(frame);
        }

        // Call callback
        onFrameChange?.(frame);

        if (debug) console.log(msg.setFrameExecuted(frame));
      } catch (error) {
        console.error(msg.setFrameExecutionError, error);
      }
    },
    [dotLottie, isDotLottieLoaded, enableStateTracking, onFrameChange, debug]
  );

  const isLoaded = isDotLottieLoaded;

  return {
    // Common refs and states
    triggerRef,
    lottieContainerRef, // Used for GSAP animations
    isMounted,
    isDOMReady,
    isClient,
    isLoaded,

    // DotLottie specific
    handleDotLottieRef, // Used in DotLottieReact
    dotLottie,
    isDotLottieLoaded,

    // Common control functions
    play,
    pause,
    stop,
    setFrame,

    // Ref-based getters (no re-rendering)
    getCurrentFrame,
    getIsPlaying,

    // React state based (updated only when enableStateTracking is true)
    isPlaying,
    currentFrame,

    // Environment info
    isSSRFramework,
  };
};
