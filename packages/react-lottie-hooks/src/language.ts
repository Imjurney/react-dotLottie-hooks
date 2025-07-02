const DEBUG_LANGUAGE = {
  ko: {
    // 로딩 관련
    loading: "GSAP 및 ScrollTrigger 라이브러리를 로드하는 중...",
    loadSuccess: "GSAP 라이브러리 로드 완료",
    loadError: "GSAP 라이브러리 로드 실패:",
    loadComplete: "Lottie 애니메이션 로드 완료",

    // Lottie 초기화
    lottieInit: "Lottie 애니메이션 초기화 중...",
    lottieSuccess: "Lottie 애니메이션 초기화 완료",
    lottieError: "Lottie 애니메이션 초기화 실패:",

    // DotLottie 전용
    dotLottieSet: "DotLottie 인스턴스 설정됨:",

    // ScrollTrigger 관련
    scrollTriggerInit: "ScrollTrigger 설정 중...",
    scrollTriggerStart: "ScrollTrigger 시작",
    scrollTriggerSuccess: "ScrollTrigger 설정 완료",
    scrollTriggerDestroy: "ScrollTrigger 해제됨",

    // 스크롤 이벤트
    scrollEnter: "스크롤 영역 진입",
    scrollLeave: "스크롤 영역 벗어남",
    scrollEnterBack: "스크롤 영역 재진입",
    scrollLeaveBack: "스크롤 영역 역방향 벗어남",

    // 애니메이션 제어
    playSuccess: "애니메이션 재생 성공",
    playError: "애니메이션 재생 실패:",
    pauseError: "애니메이션 일시정지 실패:",

    // 조건 체크
    conditionNotMet: "ScrollTrigger 생성 조건 미충족:",

    // 환경 관련
    domNotReady: "DOM이 준비되지 않음. 대기 중...",
    ssrDetected: "SSR 환경 감지됨. 클라이언트 마운트 대기중...",
    frameworkDetected: (framework: string) => `${framework} 프레임워크 감지됨`,
    safeDefaultsApplied: "SSR 프레임워크용 안전한 기본값 적용됨",

    // 프레임워크 감지
    frameworkDetectionFailed: "프레임워크 감지 실패:",
    frameworkDetectionUpdated: "프레임워크 감지 업데이트됨:",
    frameworkDetectionUpdatedAfterDOM:
      "DOM 로드 후 프레임워크 감지 업데이트됨:",
    frameworkReDetectionFailed: "프레임워크 재감지 실패:",
    frameworkReDetectionAfterDOMFailed: "DOM 로드 후 프레임워크 재감지 실패:",
    gsapInitFailed: "GSAP 또는 프레임워크 감지 초기화 실패:",

    // 초기 프레임워크 감지 (최상위 수준)
    initialFrameworkDetectionFailed: "프레임워크 감지 실패:",
    initialGSAPInitFailed: "GSAP 또는 프레임워크 감지 초기화 실패:",

    // SSR 환경
    ssrEnvironmentMessage: "SSR 환경에서는 ScrollTrigger를 사용할 수 없습니다.",

    // DotLottie 로딩
    dotLottieNotLoaded: "DotLottie가 아직 로드되지 않았습니다.",

    // 이벤트 로그
    dotLottiePlayEvent: "DotLottie 재생 이벤트",
    dotLottiePauseEvent: "DotLottie 일시정지 이벤트",
    dotLottieStopEvent: "DotLottie 정지 이벤트",

    // 제어 함수 로그
    playThrottled: "Play 호출이 throttle되었습니다.",
    pauseThrottled: "Pause 호출이 throttle되었습니다.",
    stopThrottled: "Stop 호출이 throttle되었습니다.",
    playExecuted: "Play 실행됨",
    pauseExecuted: "Pause 실행됨",
    stopExecuted: "Stop 실행됨",
    setFrameExecuted: (frame: number) => `SetFrame 실행됨: ${frame}`,

    // 에러 메시지
    playExecutionError: "Play 실행 중 오류:",
    pauseExecutionError: "Pause 실행 중 오류:",
    stopExecutionError: "Stop 실행 중 오류:",
    setFrameExecutionError: "SetFrame 실행 중 오류:",

    // GSAP 애니메이션
    gsapAnimationExecution: (trigger: string) =>
      `GSAP 애니메이션 실행: ${trigger}`,
  },
  en: {
    // Loading related
    loading: "Loading GSAP and ScrollTrigger libraries...",
    loadSuccess: "GSAP libraries loaded successfully",
    loadError: "Failed to load GSAP libraries:",
    loadComplete: "Lottie animation loaded successfully",

    // Lottie initialization
    lottieInit: "Initializing Lottie animation...",
    lottieSuccess: "Lottie animation initialized successfully",
    lottieError: "Failed to initialize Lottie animation:",

    // DotLottie specific
    dotLottieSet: "DotLottie instance set:",

    // ScrollTrigger related
    scrollTriggerInit: "Setting up ScrollTrigger...",
    scrollTriggerStart: "ScrollTrigger started",
    scrollTriggerSuccess: "ScrollTrigger setup complete",
    scrollTriggerDestroy: "ScrollTrigger destroyed",

    // Scroll events
    scrollEnter: "Entered scroll area",
    scrollLeave: "Left scroll area",
    scrollEnterBack: "Re-entered scroll area",
    scrollLeaveBack: "Left scroll area backwards",

    // Animation control
    playSuccess: "Animation played successfully",
    playError: "Failed to play animation:",
    pauseError: "Failed to pause animation:",

    // 조건 체크
    conditionNotMet: "ScrollTrigger creation conditions not met:",

    // 환경 관련
    domNotReady: "DOM not ready. Waiting...",
    ssrDetected: "SSR environment detected. Waiting for client mount...",
    frameworkDetected: (framework: string) => `${framework} framework detected`,
    safeDefaultsApplied: "Safe defaults applied for SSR framework",

    // 프레임워크 감지
    frameworkDetectionFailed: "Framework detection failed:",
    frameworkDetectionUpdated: "Framework detection updated:",
    frameworkDetectionUpdatedAfterDOM:
      "Framework detection updated after DOM loaded:",
    frameworkReDetectionFailed: "Framework re-detection failed:",
    frameworkReDetectionAfterDOMFailed:
      "Framework re-detection after DOM loaded failed:",
    gsapInitFailed: "GSAP or framework detection initialization failed:",

    // 초기 프레임워크 감지 (최상위 수준)
    initialFrameworkDetectionFailed: "Framework detection failed:",
    initialGSAPInitFailed: "GSAP or framework detection initialization failed:",

    // SSR 환경
    ssrEnvironmentMessage: "ScrollTrigger cannot be used in SSR environment.",

    // DotLottie 로딩
    dotLottieNotLoaded: "DotLottie is not loaded yet.",

    // 이벤트 로그
    dotLottiePlayEvent: "DotLottie play event",
    dotLottiePauseEvent: "DotLottie pause event",
    dotLottieStopEvent: "DotLottie stop event",

    // 제어 함수 로그
    playThrottled: "Play call was throttled.",
    pauseThrottled: "Pause call was throttled.",
    stopThrottled: "Stop call was throttled.",
    playExecuted: "Play executed",
    pauseExecuted: "Pause executed",
    stopExecuted: "Stop executed",
    setFrameExecuted: (frame: number) => `SetFrame executed: ${frame}`,

    // 에러 메시지
    playExecutionError: "Error during play execution:",
    pauseExecutionError: "Error during pause execution:",
    stopExecutionError: "Error during stop execution:",
    setFrameExecutionError: "Error during setFrame execution:",

    // GSAP 애니메이션
    gsapAnimationExecution: (trigger: string) =>
      `GSAP animation execution: ${trigger}`,
  },
};

export default DEBUG_LANGUAGE;
