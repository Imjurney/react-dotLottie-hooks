// // hooks/useLottieScrollTrigger.ts
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { DotLottie } from '@lottiefiles/dotlottie-react';
// import { gsap } from 'gsap';
// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }
// interface UseLottieScrollTriggerOptions {
//   start?: string;
//   end?: string;
//   markers?: boolean;
//   pauseOnLoad?: boolean;
//   debug?: boolean;
//   //   debugLanguage?: 'en' | 'ko';
//   onEnter?: (dotLottie: DotLottie) => void;
//   onLeave?: (dotLottie: DotLottie) => void;
//   onEnterBack?: (dotLottie: DotLottie) => void;
//   onLeaveBack?: (dotLottie: DotLottie) => void;
// }

// export const useLottieScrollTrigger = (
//   options: UseLottieScrollTriggerOptions = {}
// ) => {
//   const {
//     start = 'top center',
//     end = 'bottom 20%',
//     markers = process.env.NODE_ENV === 'development',
//     pauseOnLoad = true,
//     debug = false,

//     onEnter,
//     onLeave,
//     onEnterBack,
//     onLeaveBack,
//   } = options;

//   const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
//   const [isLottieLoaded, setIsLottieLoaded] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const triggerRef = useRef<HTMLDivElement | null>(null);

//   //   const DEBUG_MESSAGES = {
//   //     ko: {
//   //       mount: 'Next.js 마운트 확인',
//   //       dotLottieSet: 'DotLottie 인스턴스 설정',
//   //       loadComplete: 'DotLottie 로드 완료',
//   //       playSuccess: '애니메이션 재생 성공',
//   //       pauseSuccess: '애니메이션 정지 성공',
//   //       scrollEnter: '스크롤 진입 - 애니메이션 재생',
//   //       scrollLeave: '스크롤 벗어남 - 애니메이션 정지',
//   //       scrollEnterBack: '스크롤 재진입 - 애니메이션 재생',
//   //       scrollLeaveBack: '스크롤 역방향 벗어남 - 애니메이션 정지',
//   //     },
//   //   };

//   // Next.js 마운트 확인
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleDotLottieRef = useCallback(
//     (dotLottieInstance: DotLottie | null) => {
//       if (dotLottieInstance) {
//         if (debug) console.log('DotLottie 인스턴스 설정:', dotLottieInstance);
//         setDotLottie(dotLottieInstance);

//         // 로드 완료 이벤트 리스너
//         const handleLoad = () => {
//           if (debug) console.log('DotLottie 로드 완료');
//           setIsLottieLoaded(true);

//           // 초기에는 정지 상태
//           if (pauseOnLoad) {
//             setTimeout(() => {
//               dotLottieInstance.pause();
//             }, 100);
//           }
//         };

//         const handleLoadError = (error: any) => {
//           console.error('DotLottie 로드 오류:', error);
//         };

//         dotLottieInstance.addEventListener('load', handleLoad);
//         dotLottieInstance.addEventListener('loadError', handleLoadError);

//         // 이미 로드된 경우 즉시 처리
//         if (dotLottieInstance.isLoaded) {
//           handleLoad();
//         }

//         return () => {
//           dotLottieInstance.removeEventListener('load', handleLoad);
//           dotLottieInstance.removeEventListener('loadError', handleLoadError);
//         };
//       }
//     },
//     [debug, pauseOnLoad]
//   );

//   // 기본 애니메이션 제어 함수들
//   const defaultOnEnter = useCallback(
//     (dotLottie: DotLottie) => {
//       if (debug) console.log('스크롤 진입 - 애니메이션 재생');
//       try {
//         dotLottie.setFrame(0);
//         dotLottie.play();
//         if (debug) console.log('애니메이션 재생 성공');
//       } catch (error) {
//         console.error('애니메이션 재생 실패:', error);
//       }
//     },
//     [debug]
//   );

//   const defaultOnLeave = useCallback(
//     (dotLottie: DotLottie) => {
//       if (debug) console.log('스크롤 벗어남 - 애니메이션 정지');
//       try {
//         dotLottie.pause();
//       } catch (error) {
//         console.error('애니메이션 정지 실패:', error);
//       }
//     },
//     [debug]
//   );

//   const defaultOnEnterBack = useCallback(
//     (dotLottie: DotLottie) => {
//       if (debug) console.log('스크롤 재진입 - 애니메이션 재생');
//       try {
//         dotLottie.play();
//       } catch (error) {
//         console.error('애니메이션 재생 실패:', error);
//       }
//     },
//     [debug]
//   );

//   const defaultOnLeaveBack = useCallback(
//     (dotLottie: DotLottie) => {
//       if (debug) console.log('스크롤 역방향 벗어남 - 애니메이션 정지');
//       try {
//         dotLottie.pause();
//       } catch (error) {
//         console.error('애니메이션 정지 실패:', error);
//       }
//     },
//     [debug]
//   );

//   // GSAP ScrollTrigger 설정
//   useGSAP(() => {
//     if (!isMounted || !dotLottie || !isLottieLoaded || !triggerRef.current) {
//       if (debug) {
//         console.log('조건 미충족:', {
//           isMounted,
//           dotLottie: !!dotLottie,
//           isLottieLoaded,
//           triggerRef: !!triggerRef.current,
//         });
//       }
//       return;
//     }

//     if (debug) console.log('ScrollTrigger 설정 시작');

//     // ScrollTrigger 새로고침 (Next.js에서 필요할 수 있음)
//     ScrollTrigger.refresh();

//     const trigger = ScrollTrigger.create({
//       trigger: triggerRef.current,
//       start,
//       end,
//       onEnter: () => (onEnter || defaultOnEnter)(dotLottie),
//       onLeave: () => (onLeave || defaultOnLeave)(dotLottie),
//       onEnterBack: () => (onEnterBack || defaultOnEnterBack)(dotLottie),
//       onLeaveBack: () => (onLeaveBack || defaultOnLeaveBack)(dotLottie),
//       markers,
//     });

//     return () => {
//       trigger.kill();
//       if (debug) console.log('ScrollTrigger 제거됨');
//     };
//   }, [
//     isMounted,
//     dotLottie,
//     isLottieLoaded,
//     start,
//     end,
//     markers,
//     onEnter,
//     onLeave,
//     onEnterBack,
//     onLeaveBack,
//     defaultOnEnter,
//     defaultOnLeave,
//     defaultOnEnterBack,
//     defaultOnLeaveBack,
//   ]);

//   return {
//     triggerRef,
//     dotLottie,
//     isLottieLoaded,
//     isMounted,
//     handleDotLottieRef,

//     play: () => dotLottie?.play(),
//     pause: () => dotLottie?.pause(),
//     stop: () => dotLottie?.stop(),
//     setFrame: (frame: number) => dotLottie?.setFrame(frame),

//     isPlaying: dotLottie?.isPlaying || false,
//     currentFrame: dotLottie?.currentFrame || 0,
//   };
// };
