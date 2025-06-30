"use client";

import { useLottieScrollTrigger } from "@Imjurney/react-lottie-hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function LottieScrollExample() {
  const [animationStyle, setAnimationStyle] = useState<"basic" | "advanced">(
    "advanced"
  );

  // 기본 애니메이션 훅
  const basicHook = useLottieScrollTrigger({
    start: "top center",
    end: "bottom center",
    debug: process.env.NODE_ENV === "development",
    debugLanguage: "ko",
    markers: process.env.NODE_ENV === "development",
  });

  // 고급 애니메이션 훅 (GSAP 효과와 함께)
  const advancedHook = useLottieScrollTrigger({
    start: "top center",
    end: "bottom center",
    debug: process.env.NODE_ENV === "development",
    debugLanguage: "ko",
    markers: process.env.NODE_ENV === "development",

    gsapAnimations: {
      scale: 1.2,
      rotation: 180,
      duration: 1.5,
      trigger: "enter",
      scrub: 0.5,
    },

    onEnter: (dotLottie) => {
      console.log("애니메이션 영역 진입!");
      dotLottie.setSpeed(1.5);
    },

    onScrollUpdate: (progress) => {
      console.log(`스크롤 진행률: ${Math.round(progress * 100)}%`);
    },
  });

  const currentHook = animationStyle === "basic" ? basicHook : advancedHook;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* 헤더 섹션 */}
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          React Lottie Hooks
        </h1>
        <p className="text-xl text-gray-600 text-center mb-8 max-w-2xl">
          DotLottie 전용 스크롤 기반 애니메이션 훅
        </p>

        {/* 애니메이션 스타일 선택 버튼 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setAnimationStyle("basic")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              animationStyle === "basic"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50"
            }`}
          >
            기본 애니메이션
          </button>
          <button
            onClick={() => setAnimationStyle("advanced")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              animationStyle === "advanced"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-green-500 border-2 border-green-500 hover:bg-green-50"
            }`}
          >
            고급 애니메이션 (GSAP)
          </button>
        </div>

        <div className="mt-8 text-center text-gray-500">
          ⬇️ 아래로 스크롤하여 애니메이션을 확인하세요
        </div>
      </div>

      {/* 애니메이션 섹션 */}
      <div
        ref={currentHook.triggerRef}
        className="h-screen flex items-center justify-center bg-white"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            {animationStyle === "basic"
              ? "기본 DotLottie 애니메이션"
              : "고급 DotLottie 애니메이션 (GSAP 효과)"}
          </h2>

          <div
            ref={currentHook.lottieContainerRef}
            className="w-80 h-80 mx-auto mb-8 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
          >
            <DotLottieReact
              src="/animation.lottie" // 공개 DotLottie 파일
              dotLottieRefCallback={currentHook.handleDotLottieRef}
              autoplay={false}
              loop={true}
              className="w-full h-full"
            />
          </div>

          {/* 제어 버튼 */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={currentHook.play}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              disabled={!currentHook.isLoaded}
            >
              ▶️ 재생
            </button>
            <button
              onClick={currentHook.pause}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
              disabled={!currentHook.isLoaded}
            >
              ⏸️ 일시정지
            </button>
            <button
              onClick={currentHook.stop}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              disabled={!currentHook.isLoaded}
            >
              ⏹️ 정지
            </button>
            <button
              onClick={() => currentHook.setFrame(0)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={!currentHook.isLoaded}
            >
              🔄 리셋
            </button>
          </div>

          {/* 상태 표시 */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="font-semibold text-gray-700">로드 상태</div>
              <div
                className={`${
                  currentHook.isLoaded ? "text-green-600" : "text-orange-600"
                }`}
              >
                {currentHook.isLoaded ? "✅ 로드됨" : "⏳ 로딩 중..."}
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="font-semibold text-gray-700">재생 상태</div>
              <div
                className={`${
                  currentHook.isPlaying ? "text-green-600" : "text-gray-600"
                }`}
              >
                {currentHook.isPlaying ? "▶️ 재생 중" : "⏸️ 일시정지"}
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="font-semibold text-gray-700">현재 프레임</div>
              <div className="text-blue-600">
                {Math.round(currentHook.currentFrame)}
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="font-semibold text-gray-700">
                애니메이션 스타일
              </div>
              <div className="text-purple-600">
                {animationStyle === "basic" ? "기본" : "고급"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상태 정보 섹션 */}
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl mx-auto p-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            DotLottie 전용 훅 특징
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                🎯 간단한 API
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• DotLottie 전용으로 최적화</p>
                <p>• 복잡한 설정 없이 바로 사용</p>
                <p>• TypeScript 완전 지원</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-green-800">
                🚀 고성능
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• SSR/CSR 자동 감지</p>
                <p>• 메모리 최적화</p>
                <p>• GSAP ScrollTrigger 통합</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">
                🎨 풍부한 기능
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• 스크롤 기반 애니메이션</p>
                <p>• GSAP 효과 통합</p>
                <p>• 커스텀 이벤트 핸들러</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-orange-800">
                🛡️ 안전성
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• Next.js 완벽 지원</p>
                <p>• Hydration 에러 방지</p>
                <p>• 에러 핸들링 내장</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">
              💡 사용 팁
            </h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>
                • <strong>기본 애니메이션:</strong> 단순한 스크롤 트리거
                애니메이션
              </p>
              <p>
                • <strong>고급 애니메이션:</strong> GSAP 효과와 함께 사용하여 더
                화려한 효과
              </p>
              <p>
                • <strong>디버그 모드:</strong> 개발 환경에서 markers와
                console.log 활성화
              </p>
              <p>
                • <strong>SSR 안전:</strong> Next.js, Nuxt.js에서 자동으로
                안전하게 처리
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
