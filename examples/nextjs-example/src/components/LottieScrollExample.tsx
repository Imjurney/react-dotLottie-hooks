"use client";

import { useLottieScrollTrigger } from "@Imjurney/react-lottie-hooks";
import { DotLottieReactProps } from "@lottiefiles/dotlottie-react";
import * as animationData from "@/asset/animation.json"; // 애니메이션 파일 경로
import dynamic from "next/dynamic";
import { useRef } from "react";
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false } // 이 부분이 중요합니다.
);
export default function LottieScrollExample() {
  const ref = useRef<HTMLDivElement>(null);
  const { triggerRef, handleDotLottieRef, isLottieLoaded, isPlaying } =
    useLottieScrollTrigger({
      start: "top center",
      end: "bottom 20%",
      debug: true,
      debugLanguage: "ko",
      pauseOnLoad: true,
      onEnter: (dotLottie) => {},
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Next.js + React Lottie Hooks 예시
        </h1>

        <div className="space-y-16">
          {/* 설명 섹션 */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-4">
              아래로 스크롤하면 Lottie 애니메이션이 자동으로 재생됩니다.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <span
                className={`px-3 py-1 rounded-full ${
                  isLottieLoaded
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isLottieLoaded ? "✅ 로드됨" : "⏳ 로딩중"}
              </span>
              <span
                className={`px-3 py-1 rounded-full ${
                  isPlaying
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isPlaying ? "▶️ 재생중" : "⏸️ 정지"}
              </span>
            </div>
          </div>

          {/* 스페이서 */}
          <div className="h-96"></div>

          {/* Lottie 애니메이션 섹션 */}
          <div ref={triggerRef} className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">
              스크롤 트리거 애니메이션
            </h2>
            <div className="flex justify-center">
              <div className="w-96 h-96 bg-white rounded-lg shadow-lg p-8">
                <DotLottieReact
                  data={animationData}
                  loop
                  renderConfig={{
                    freezeOnOffscreen: true, // 화면 밖에 있을 때 애니메이션을 멈추도록 설정
                    devicePixelRatio: 2, // 디바이스 픽셀 비율을 2로 설정
                    autoResize: true, // 자동 크기 조정 활성화
                  }}
                  autoplay={false}
                  dotLottieRefCallback={handleDotLottieRef}
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              이 애니메이션은 스크롤 위치에 따라 자동으로 제어됩니다.
            </p>
          </div>

          {/* 더 많은 콘텐츠 */}
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                더 많은 콘텐츠
              </h3>
              <p className="text-gray-600">
                스크롤을 계속해서 애니메이션 동작을 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
