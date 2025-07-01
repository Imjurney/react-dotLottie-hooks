import type { MetaFunction } from "@remix-run/node";
import { LottieScrollExample } from "../components/LottieScrollExample";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix + DotLottie ScrollTrigger Example" },
    {
      name: "description",
      content:
        "Remix + DotLottie ScrollTrigger Example using GSAP for scroll-based animations.",
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Remix + DotLottie ScrollTrigger
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Remix + DotLottie ScrollTrigger Example using GSAP for scroll-based
            animations.
          </p>
        </div>

        <LottieScrollExample />
      </main>
    </div>
  );
}
