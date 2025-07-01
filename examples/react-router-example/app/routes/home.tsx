import type { Route } from "./+types/home";
import { LottieScrollExample } from "../components/LottieScrollExample";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router + DotLottie ScrollTrigger 예제" },
    {
      name: "description",
      content:
        "React Router에서 DotLottie와 GSAP ScrollTrigger를 활용한 애니메이션 예제",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Router + DotLottie ScrollTrigger
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            React Router 애플리케이션에서 DotLottie와 GSAP ScrollTrigger를
            활용한 스크롤 기반 애니메이션 예제입니다.
          </p>
        </div>

        <LottieScrollExample />
      </main>
    </div>
  );
}
