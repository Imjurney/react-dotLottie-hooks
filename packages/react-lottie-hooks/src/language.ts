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

    // lottie-web 전용
    lottieWebInit: "lottie-web 애니메이션 초기화 중...",
    lottieWebLoadComplete: "lottie-web 애니메이션 로드 완료",
    lottieWebLoadError: "lottie-web 애니메이션 로드 실패:",

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

    // lottie-web specific
    lottieWebInit: "Initializing lottie-web animation...",
    lottieWebLoadComplete: "lottie-web animation loaded successfully",
    lottieWebLoadError: "Failed to load lottie-web animation:",

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

    // Condition checks
    conditionNotMet: "ScrollTrigger creation conditions not met:",

    // Environment related
    domNotReady: "DOM not ready. Waiting...",
    ssrDetected: "SSR environment detected. Waiting for client mount...",
    frameworkDetected: (framework: string) => `${framework} framework detected`,
    safeDefaultsApplied: "Safe defaults applied for SSR framework",
  },
};

export default DEBUG_LANGUAGE;
