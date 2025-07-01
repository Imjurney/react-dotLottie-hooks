import { useLottieScrollTrigger } from "@jurneyx2/react-lottie-hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function LottieScrollExample() {
  const [externalPlayState, setExternalPlayState] = useState(false);
  const [debugInfo, setDebugInfo] = useState(""); // 디버깅 정보
  const [isManualControl, setIsManualControl] = useState(false); // 수동 제어 모드

  // 성능 최적화된 훅 사용
  const {
    triggerRef,
    handleDotLottieRef,
    play,
    pause,
    getIsPlaying, // ref 기반 getter 추가
    isLoaded,
    isClient,
    isDOMReady,
    dotLottie, // DotLottie 인스턴스에 직접 접근
  } = useLottieScrollTrigger({
    start: "top center",
    end: "bottom center",
    debug: import.meta.env.DEV,
    debugLanguage: "ko",
    markers: import.meta.env.DEV,

    // 성능 최적화: 콜백으로 상태 동기화
    onPlayStateChange: (isPlaying) => {
      console.log("재생 상태 변경:", isPlaying);
      setExternalPlayState(isPlaying);
      setDebugInfo(
        `onPlayStateChange: ${
          isPlaying ? "재생" : "일시정지"
        } (${new Date().toLocaleTimeString()})`
      );
    },

    // 스크롤 이벤트 (수동 제어 모드가 아닐 때만 작동)
    onEnter: (dotLottie) => {
      console.log("애니메이션 영역 진입!");
      if (!isManualControl) {
        dotLottie.play();
      }
      // onPlayStateChange 콜백에서 자동으로 setExternalPlayState(true) 호출됨
    },
    onLeave: (dotLottie) => {
      console.log("애니메이션 영역 벗어남!");
      if (!isManualControl) {
        dotLottie.pause();
      }
      // onPlayStateChange 콜백에서 자동으로 setExternalPlayState(false) 호출됨
    },
  });

  const handlePlayToggle = () => {
    // 수동 제어 모드 활성화
    setIsManualControl(true);

    // ref 기반으로 현재 상태를 정확히 확인 (리랜더링 없음)
    const currentPlayState = getIsPlaying();
    const dotLottieNativeState = dotLottie?.isPlaying || false;

    console.log("🔍 상태 확인:", {
      refState: currentPlayState,
      dotLottieNative: dotLottieNativeState,
      externalState: externalPlayState,
      isLoaded: isLoaded,
      isManualControl: true,
    });

    if (currentPlayState) {
      console.log("⏸️ 일시정지 명령 실행 (수동 제어)");
      pause();
    } else {
      console.log("▶️ 재생 명령 실행 (수동 제어)");
      play();
    }

    // 3초 후 자동 제어 모드로 복원 (선택사항)
    setTimeout(() => {
      setIsManualControl(false);
      console.log("🔄 자동 제어 모드로 복원");
    }, 3000);

    // 상태 업데이트는 onPlayStateChange 콜백에서 자동으로 처리됨
  };

  // 자동 제어 모드로 복원하는 함수
  const handleAutoMode = () => {
    setIsManualControl(false);
    console.log("🔄 자동 제어 모드로 수동 복원");
    setDebugInfo(
      `자동 제어 모드로 복원됨 (${new Date().toLocaleTimeString()})`
    );
  };

  // 직접 DotLottie 상태 확인 함수
  const handleDirectCheck = () => {
    if (dotLottie) {
      const nativeState = dotLottie.isPlaying;
      const refState = getIsPlaying();
      alert(
        `DotLottie 직접 확인:\n- Native: ${nativeState}\n- Ref: ${refState}\n- External: ${externalPlayState}`
      );
    }
  };

  // SSR 안전성 체크
  if (!isClient || !isDOMReady) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* 헤더 섹션 */}
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          React Lottie Hooks v1.2
        </h1>
        <p className="text-xl md:text-base text-gray-600 text-center mb-8 max-w-3xl md:px-4">
          성능 최적화된 DotLottie 전용 스크롤 기반 애니메이션 훅
        </p>
        <div className="mt-8 text-center text-gray-500">
          ⬇️ 아래로 스크롤하여 애니메이션을 확인하세요
        </div>
      </div>

      {/* 애니메이션 섹션 */}
      <div
        ref={triggerRef}
        className="h-screen flex items-center justify-center bg-white"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            성능 최적화된 DotLottie 애니메이션
          </h2>

          <div className="w-80 h-80 md:w-64 md:h-64 mx-auto mb-8 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <DotLottieReact
              src="./animation.lottie"
              dotLottieRefCallback={handleDotLottieRef}
              autoplay={false}
              loop={true}
              className="w-full h-full"
            />
          </div>

          {/* 제어 버튼 */}
          <div className="flex md:flex-col justify-center gap-4 md:gap-2 md:items-center mb-8">
            <button
              onClick={handlePlayToggle}
              className="px-4 py-2 md:w-48 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={!isLoaded}
            >
              {externalPlayState ? "⏸️ 일시정지" : "▶️ 재생"}
            </button>

            <button
              onClick={handleAutoMode}
              className={`px-4 py-2 md:w-48 rounded-lg transition-colors disabled:opacity-50 font-medium ${
                isManualControl
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isLoaded || !isManualControl}
            >
              🔄 자동 모드
            </button>

            <button
              onClick={handleDirectCheck}
              className="px-4 py-2 md:w-48 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={!isLoaded}
            >
              🔍 상태 확인
            </button>
          </div>

          {/* 상태 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 max-w-md md:max-w-xs mx-auto mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">로드 상태</div>
              <div
                className={`text-lg font-medium ${
                  isLoaded ? "text-green-600" : "text-orange-600"
                }`}
              >
                {isLoaded ? "✅ 로드됨" : "⏳ 로딩 중..."}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">재생 상태</div>
              <div
                className={`text-lg font-medium ${
                  externalPlayState ? "text-green-600" : "text-gray-600"
                }`}
              >
                {externalPlayState ? "▶️ 재생 중" : "⏸️ 일시정지"}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">현재 프레임</div>
              <div className="text-lg font-medium text-blue-600">
                🎬 최적화됨
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">제어 모드</div>
              <div
                className={`text-lg font-medium ${
                  isManualControl ? "text-orange-600" : "text-blue-600"
                }`}
              >
                {isManualControl ? "🔧 수동 제어" : "🤖 자동 제어"}
              </div>
            </div>
          </div>

          {/* 디버깅 정보 */}
          {debugInfo && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <div className="text-sm text-yellow-800 font-medium mb-1">
                디버그 정보
              </div>
              <div className="text-sm text-yellow-700">{debugInfo}</div>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
            <p className="mb-2">
              ⚡ <strong>성능 최적화:</strong> 기본값으로 React state 추적
              비활성화
            </p>
            <p className="mb-2">
              📊 <strong>스크롤 기반:</strong> 자동 애니메이션 제어
            </p>
            <p className="mb-2">
              🎯 <strong>수동 상태 관리:</strong> 필요할 때만 외부 상태 업데이트
            </p>
            <p className="text-orange-600">
              🔧 <strong>수동/자동 제어:</strong> 버튼 클릭 시 3초간 수동 모드
            </p>
          </div>
        </div>
      </div>

      {/* 추가 콘텐츠 */}
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            스크롤 기반 제어
          </h2>
          <p className="text-lg text-gray-600">
            스크롤 위치에 따라 애니메이션이 자동으로 제어됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
