// hooks/useLottieScrollTrigger.ts
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { DotLottie } from "@lottiefiles/dotlottie-react";
import { gsap } from "gsap";
import DEBUG_LANGUAGE from "./language";

// SSR/CSR 환경 체크
const isClient = typeof window !== "undefined";

// SSR 프레임워크 감지
const isNextJS =
  typeof window !== "undefined" && (window as any).__NEXT_DATA__ !== undefined;

const isNuxt =
  typeof window !== "undefined" && (window as any).__NUXT__ !== undefined;

const isSSRFramework = isNextJS || isNuxt;

if (isClient) {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseLottieScrollTriggerOptions {
  // 공통 ScrollTrigger 옵션
  start?: string;
  end?: string;
  markers?: boolean;
  pauseOnLoad?: boolean;
  debug?: boolean;
  debugLanguage?: "ko" | "en";

  // SSR/CSR 관련 옵션
  strictMode?: boolean;
  waitForDOMReady?: boolean;

  // 성능 최적화 옵션 (리랜더링 제어)
  enableStateTracking?: boolean; // React state로 isPlaying/currentFrame 추적 여부 (기본: false, 성능 우선)
  frameUpdateThrottle?: number; // 프레임 업데이트 throttle (ms, 기본: 100)
  onPlayStateChange?: (isPlaying: boolean) => void; // play/pause 상태 변경 콜백
  onFrameChange?: (currentFrame: number) => void; // 프레임 변경 콜백 (throttled)

  // DotLottie 이벤트 콜백
  onEnter?: (dotLottie: DotLottie) => void;
  onLeave?: (dotLottie: DotLottie) => void;
  onEnterBack?: (dotLottie: DotLottie) => void;
  onLeaveBack?: (dotLottie: DotLottie) => void;

  // GSAP 애니메이션 옵션들
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

  // 추가 GSAP ScrollTrigger 옵션
  scrollTriggerOptions?: Partial<ScrollTrigger.StaticVars>;
}

export interface UseLottieScrollTriggerReturn {
  // 공통 ref와 상태
  triggerRef: React.RefObject<HTMLDivElement>;
  lottieContainerRef: React.RefObject<HTMLDivElement>;
  isMounted: boolean;
  isDOMReady: boolean;
  isClient: boolean;
  isLoaded: boolean;

  // DotLottie 전용
  handleDotLottieRef: (dotLottie: DotLottie | null) => void;
  dotLottie: DotLottie | null;
  isDotLottieLoaded: boolean;

  // 공통 제어 함수
  play: () => void;
  pause: () => void;
  stop: () => void;
  setFrame: (frame: number) => void;

  // 애니메이션 상태 - ref 기반 getter (리랜더링 없음)
  getCurrentFrame: () => number; // ref 기반 getter
  getIsPlaying: () => boolean; // ref 기반 getter

  // React state 기반 (enableStateTracking이 true일 때만 업데이트됨)
  isPlaying: boolean; // enableStateTracking이 false면 항상 false
  currentFrame: number; // enableStateTracking이 false면 항상 0

  // 환경 정보
  isSSRFramework: boolean;
  isNextJS: boolean;
  isNuxt: boolean;
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

    // 성능 최적화 옵션
    enableStateTracking = false, // 기본값: false (성능 우선)
    frameUpdateThrottle = 100,
    onPlayStateChange,
    onFrameChange,

    // DotLottie 콜백
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,

    // 공통 옵션
    gsapAnimations,
    scrollTriggerOptions,
  } = options;

  // 공통 상태
  const [isMounted, setIsMounted] = useState(false);
  const [isDOMReady, setIsDOMReady] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);

  // DotLottie 전용 상태
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [isDotLottieLoaded, setIsDotLottieLoaded] = useState(false);

  // ref 기반 애니메이션 상태 (리랜더링 없음)
  const playStateRef = useRef(false);
  const frameRef = useRef(0);

  // React state 기반 (선택적 추적)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // throttle을 위한 ref
  const lastUpdateTimeRef = useRef(0);
  const lastPlayTimeRef = useRef(0); // play 전용 debounce
  const lastPauseTimeRef = useRef(0); // pause 전용 debounce

  // ref 기반 getter 함수들
  const getCurrentFrame = useCallback(() => frameRef.current, []);
  const getIsPlaying = useCallback(() => playStateRef.current, []);

  const msg = DEBUG_LANGUAGE[debugLanguage] || DEBUG_LANGUAGE["ko"];

  // 마운트 및 DOM 준비 상태 관리
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
          } else {
            const handleDOMContentLoaded = () => setIsDOMReady(true);
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
  }, [waitForDOMReady]);

  // DotLottie ref 핸들러
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

        // 성능 최적화된 이벤트 리스너들
        const handlePlay = () => {
          playStateRef.current = true;

          // 선택적 React state 업데이트
          if (enableStateTracking) {
            setIsPlaying(true);
          }

          // 콜백 호출
          onPlayStateChange?.(true);

          if (debug) console.log("DotLottie play event");
        };

        const handlePause = () => {
          playStateRef.current = false;

          // 선택적 React state 업데이트
          if (enableStateTracking) {
            setIsPlaying(false);
          }

          // 콜백 호출
          onPlayStateChange?.(false);

          if (debug) console.log("DotLottie pause event");
        };

        const handleStop = () => {
          playStateRef.current = false;
          frameRef.current = 0;

          // 선택적 React state 업데이트
          if (enableStateTracking) {
            setIsPlaying(false);
            setCurrentFrame(0);
          }

          // 콜백 호출
          onPlayStateChange?.(false);
          onFrameChange?.(0);

          if (debug) console.log("DotLottie stop event");
        };

        // 프레임 업데이트는 throttle 적용
        const handleFrame = (event: any) => {
          const now = Date.now();
          const newFrame = Math.round(event.currentFrame || 0);

          // ref는 항상 업데이트 (throttle 없음)
          frameRef.current = newFrame;

          // throttle 적용된 업데이트들
          if (now - lastUpdateTimeRef.current > frameUpdateThrottle) {
            // 선택적 React state 업데이트
            if (enableStateTracking) {
              setCurrentFrame(newFrame);
            }

            // 콜백 호출
            onFrameChange?.(newFrame);

            lastUpdateTimeRef.current = now;
          }
        };

        dotLottieInstance.addEventListener("load", handleLoad);
        dotLottieInstance.addEventListener("loadError", handleLoadError);
        dotLottieInstance.addEventListener("play", handlePlay);
        dotLottieInstance.addEventListener("pause", handlePause);
        dotLottieInstance.addEventListener("stop", handleStop);

        // 프레임 이벤트는 조건부로만 등록 (성능 최적화)
        if (debug || enableStateTracking || onFrameChange) {
          dotLottieInstance.addEventListener("frame", handleFrame);
        }

        if (dotLottieInstance.isLoaded) {
          handleLoad();
        }

        // 초기 상태 동기화
        const initialPlaying = dotLottieInstance.isPlaying || false;
        const initialFrame = Math.round(dotLottieInstance.currentFrame || 0);

        // ref 업데이트
        playStateRef.current = initialPlaying;
        frameRef.current = initialFrame;

        // 선택적 React state 업데이트
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
        // DotLottie 인스턴스가 null일 때 상태 초기화
        setDotLottie(null);
        setIsDotLottieLoaded(false);
        setIsPlaying(false);
        setCurrentFrame(0);
      }
    },
    [debug, pauseOnLoad, msg]
  );

  // GSAP 애니메이션 실행 함수
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
          console.log(`GSAP 애니메이션 실행: ${trigger}`, gsapAnimations);

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

  // DotLottie 기본 이벤트 핸들러들
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

  // ScrollTrigger 이벤트 핸들러
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

  // ScrollTrigger 설정
  useGSAP(() => {
    if (!isClient) {
      if (debug)
        console.log("SSR 환경에서는 ScrollTrigger를 사용할 수 없습니다.");
      return;
    }

    // 조건 체크
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

    // ScrollTrigger 새로고침
    if (ScrollTrigger) {
      ScrollTrigger.refresh();
    }

    const handlers = createScrollTriggerHandlers();

    // ScrollTrigger 설정
    const scrollTriggerConfig: ScrollTrigger.StaticVars = {
      trigger: triggerRef.current,
      start,
      end,
      markers,
      ...handlers,
      ...(scrollTriggerOptions || {}),
    };

    // GSAP 애니메이션에 scrub 옵션이 있으면 추가
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

  // 공통 제어 함수들 (debounce 및 콜백 포함)
  const play = useCallback(() => {
    if (!dotLottie || !isDotLottieLoaded) {
      if (debug) console.warn("DotLottie가 아직 로드되지 않았습니다.");
      return;
    }

    // debounce: 100ms 내 중복 호출 방지
    const now = Date.now();
    if (now - lastPlayTimeRef.current < 100) {
      if (debug) console.log("Play 호출이 throttle되었습니다.");
      return;
    }
    lastPlayTimeRef.current = now;

    try {
      dotLottie.play();

      // ref 상태 즉시 업데이트
      playStateRef.current = true;

      // 선택적 React state 업데이트
      if (enableStateTracking) {
        setIsPlaying(true);
      }

      // 콜백 호출
      onPlayStateChange?.(true);

      if (debug) console.log("Play 실행됨");
    } catch (error) {
      console.error("Play 실행 중 오류:", error);
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
      if (debug) console.warn("DotLottie가 아직 로드되지 않았습니다.");
      return;
    }

    // debounce: 100ms 내 중복 호출 방지
    const now = Date.now();
    if (now - lastPauseTimeRef.current < 100) {
      if (debug) console.log("Pause 호출이 throttle되었습니다.");
      return;
    }
    lastPauseTimeRef.current = now;

    try {
      dotLottie.pause();

      // ref 상태 즉시 업데이트
      playStateRef.current = false;

      // 선택적 React state 업데이트
      if (enableStateTracking) {
        setIsPlaying(false);
      }

      // 콜백 호출
      onPlayStateChange?.(false);

      if (debug) console.log("Pause 실행됨");
    } catch (error) {
      console.error("Pause 실행 중 오류:", error);
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
      if (debug) console.warn("DotLottie가 아직 로드되지 않았습니다.");
      return;
    }

    // debounce: 100ms 내 중복 호출 방지
    const now = Date.now();
    if (now - lastPauseTimeRef.current < 100) {
      if (debug) console.log("Stop 호출이 throttle되었습니다.");
      return;
    }
    lastPauseTimeRef.current = now;

    try {
      dotLottie.stop();

      // ref 상태 즉시 업데이트
      playStateRef.current = false;
      frameRef.current = 0;

      // 선택적 React state 업데이트
      if (enableStateTracking) {
        setIsPlaying(false);
        setCurrentFrame(0);
      }

      // 콜백 호출
      onPlayStateChange?.(false);
      onFrameChange?.(0);

      if (debug) console.log("Stop 실행됨");
    } catch (error) {
      console.error("Stop 실행 중 오류:", error);
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
        if (debug) console.warn("DotLottie가 아직 로드되지 않았습니다.");
        return;
      }

      try {
        dotLottie.setFrame(frame);

        // ref 상태 즉시 업데이트
        frameRef.current = frame;

        // 선택적 React state 업데이트
        if (enableStateTracking) {
          setCurrentFrame(frame);
        }

        // 콜백 호출
        onFrameChange?.(frame);

        if (debug) console.log(`SetFrame 실행됨: ${frame}`);
      } catch (error) {
        console.error("SetFrame 실행 중 오류:", error);
      }
    },
    [dotLottie, isDotLottieLoaded, enableStateTracking, onFrameChange, debug]
  );

  const isLoaded = isDotLottieLoaded;

  return {
    // 공통 ref와 상태
    triggerRef,
    lottieContainerRef, // GSAP 애니메이션에 사용
    isMounted,
    isDOMReady,
    isClient,
    isLoaded,

    // DotLottie 전용
    handleDotLottieRef, // DotLottieReact에서 사용
    dotLottie,
    isDotLottieLoaded,

    // 공통 제어 함수
    play,
    pause,
    stop,
    setFrame,

    // ref 기반 getter (리랜더링 없음)
    getCurrentFrame,
    getIsPlaying,

    // React state 기반 (enableStateTracking이 true일 때만 업데이트됨)
    isPlaying,
    currentFrame,

    // 환경 정보
    isSSRFramework,
    isNextJS,
    isNuxt,
  };
};
