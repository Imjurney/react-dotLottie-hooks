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

  // DotLottie 이벤트 콜백
  onEnter?: (dotLottie: DotLottie) => void;
  onLeave?: (dotLottie: DotLottie) => void;
  onEnterBack?: (dotLottie: DotLottie) => void;
  onLeaveBack?: (dotLottie: DotLottie) => void;

  // 스크롤 진행률 콜백
  onScrollUpdate?: (progress: number) => void;

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

  // 공통 상태
  isPlaying: boolean;
  currentFrame: number;

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

    // DotLottie 콜백
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,

    // 공통 옵션
    onScrollUpdate,
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

        dotLottieInstance.addEventListener("load", handleLoad);
        dotLottieInstance.addEventListener("loadError", handleLoadError);

        if (dotLottieInstance.isLoaded) {
          handleLoad();
        }

        return () => {
          dotLottieInstance.removeEventListener("load", handleLoad);
          dotLottieInstance.removeEventListener("loadError", handleLoadError);
        };
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
      onUpdate: (self) => {
        if (onScrollUpdate) {
          onScrollUpdate(self.progress);
        }
      },
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
    onScrollUpdate,
    debug,
    msg,
    scrollTriggerOptions,
    gsapAnimations,
  ]);

  // 공통 제어 함수들
  const play = useCallback(() => {
    if (dotLottie) {
      dotLottie.play();
    }
  }, [dotLottie]);

  const pause = useCallback(() => {
    if (dotLottie) {
      dotLottie.pause();
    }
  }, [dotLottie]);

  const stop = useCallback(() => {
    if (dotLottie) {
      dotLottie.stop();
    }
  }, [dotLottie]);

  const setFrame = useCallback(
    (frame: number) => {
      if (dotLottie) {
        dotLottie.setFrame(frame);
      }
    },
    [dotLottie]
  );

  // 현재 재생 상태
  const isPlaying = dotLottie?.isPlaying || false;
  const currentFrame = dotLottie?.currentFrame || 0;
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

    // 공통 상태
    isPlaying,
    currentFrame,

    // 환경 정보
    isSSRFramework,
    isNextJS,
    isNuxt,
  };
};
