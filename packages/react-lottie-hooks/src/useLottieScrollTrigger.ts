// hooks/useLottieScrollTrigger.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { DotLottie } from "@lottiefiles/dotlottie-react";
import { gsap } from "gsap";
import DEBUG_LANGUAGE from "./language";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseLottieScrollTriggerOptions {
  start?: string;
  end?: string;
  markers?: boolean;
  pauseOnLoad?: boolean;
  debug?: boolean;
  debugLanguage?: "ko" | "en"; // 다국어 지원을 위한 언어 코드
  onEnter?: (dotLottie: DotLottie) => void;
  onLeave?: (dotLottie: DotLottie) => void;
  onEnterBack?: (dotLottie: DotLottie) => void;
  onLeaveBack?: (dotLottie: DotLottie) => void;
  // GSAP 애니메이션 옵션들
  gsapAnimation?: {
    rotation?: number;
    scale?: number;
    x?: number;
    y?: number;
    opacity?: number;
    duration?: number;
    ease?: string;
    trigger?: 'enter' | 'enterBack' | 'leave' | 'leaveBack' | 'scroll';
    scrub?: boolean | number;
  };
  // 추가 GSAP ScrollTrigger 옵션
  scrollTriggerOptions?: ScrollTrigger.StaticVars;
}

export const useLottieScrollTrigger = (
  options: UseLottieScrollTriggerOptions = {}
) => {
  const {
    start = "top center",
    end = "bottom 20%",
    markers = process.env.NODE_ENV === "development",
    pauseOnLoad = true,
    debug = false,
    debugLanguage = "ko",
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    gsapAnimation,
    scrollTriggerOptions,
  } = options;

  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);

  const msg = DEBUG_LANGUAGE[debugLanguage] || DEBUG_LANGUAGE["ko"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDotLottieRef = useCallback(
    (dotLottieInstance: DotLottie | null) => {
      if (dotLottieInstance) {
        if (debug) console.log(msg.dotLottieSet, dotLottieInstance);
        setDotLottie(dotLottieInstance);

        const handleLoad = () => {
          if (debug) console.log(msg.loadComplete);
          setIsLottieLoaded(true);

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

  // GSAP 애니메이션 실행 함수
  const executeGsapAnimation = useCallback(
    (trigger: string) => {
      if (!gsapAnimation || !lottieContainerRef.current) return;

      const {
        rotation = 0,
        scale = 1,
        x = 0,
        y = 0,
        opacity = 1,
        duration = 1,
        ease = "power2.out",
        trigger: animationTrigger = "enter",
      } = gsapAnimation;

      if (animationTrigger === trigger) {
        if (debug) console.log(`GSAP 애니메이션 실행: ${trigger}`, gsapAnimation);
        
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
    [gsapAnimation, debug]
  );

  // 향상된 기본 이벤트 핸들러들
  const enhancedOnEnter = useCallback(
    (dotLottie: DotLottie) => {
      if (onEnter) {
        onEnter(dotLottie);
      } else {
        defaultOnEnter(dotLottie);
      }
      executeGsapAnimation('enter');
    },
    [onEnter, defaultOnEnter, executeGsapAnimation]
  );

  const enhancedOnLeave = useCallback(
    (dotLottie: DotLottie) => {
      if (onLeave) {
        onLeave(dotLottie);
      } else {
        defaultOnLeave(dotLottie);
      }
      executeGsapAnimation('leave');
    },
    [onLeave, defaultOnLeave, executeGsapAnimation]
  );

  const enhancedOnEnterBack = useCallback(
    (dotLottie: DotLottie) => {
      if (onEnterBack) {
        onEnterBack(dotLottie);
      } else {
        defaultOnEnterBack(dotLottie);
      }
      executeGsapAnimation('enterBack');
    },
    [onEnterBack, defaultOnEnterBack, executeGsapAnimation]
  );

  const enhancedOnLeaveBack = useCallback(
    (dotLottie: DotLottie) => {
      if (onLeaveBack) {
        onLeaveBack(dotLottie);
      } else {
        defaultOnLeaveBack(dotLottie);
      }
      executeGsapAnimation('leaveBack');
    },
    [onLeaveBack, defaultOnLeaveBack, executeGsapAnimation]
  );

  useGSAP(() => {
    if (!isMounted || !dotLottie || !isLottieLoaded || !triggerRef.current) {
      if (debug) {
        console.log(msg.conditionNotMet, {
          isMounted,
          dotLottie: !!dotLottie,
          isLottieLoaded,
          triggerRef: !!triggerRef.current,
        });
      }
      return;
    }

    if (debug) console.log(msg.scrollTriggerStart);

    // ScrollTrigger 새로고침 (Next.js에서 필요할 수 있음)
    ScrollTrigger.refresh();

    // ScrollTrigger 기본 설정
    const scrollTriggerConfig: ScrollTrigger.StaticVars = {
      trigger: triggerRef.current,
      start,
      end,
      onEnter: () => enhancedOnEnter(dotLottie),
      onLeave: () => enhancedOnLeave(dotLottie),
      onEnterBack: () => enhancedOnEnterBack(dotLottie),
      onLeaveBack: () => enhancedOnLeaveBack(dotLottie),
      markers,
      // 추가 ScrollTrigger 옵션 적용
      ...(scrollTriggerOptions || {}),
    };

    // GSAP 애니메이션에 scrub 옵션이 있으면 추가
    if (gsapAnimation?.scrub !== undefined) {
      scrollTriggerConfig.scrub = gsapAnimation.scrub;
    }

    const trigger = ScrollTrigger.create(scrollTriggerConfig);

    return () => {
      trigger.kill();
      if (debug) console.log(msg.scrollTriggerDestroy);
    };
  }, [
    isMounted,
    dotLottie,
    isLottieLoaded,
    start,
    end,
    markers,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    defaultOnEnter,
    defaultOnLeave,
    defaultOnEnterBack,
    defaultOnLeaveBack,
    debug,
    msg,
  ]);

  return {
    triggerRef,
    dotLottie,
    isLottieLoaded,
    isMounted,
    handleDotLottieRef,

    play: () => dotLottie?.play(),
    pause: () => dotLottie?.pause(),
    stop: () => dotLottie?.stop(),
    setFrame: (frame: number) => dotLottie?.setFrame(frame),

    isPlaying: dotLottie?.isPlaying || false,
    currentFrame: dotLottie?.currentFrame || 0,
  };
};
