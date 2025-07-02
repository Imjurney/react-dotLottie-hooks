import type { Route } from "./+types/home";
import { LottieScrollExample } from "../components/LottieScrollExample";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router + DotLottie ScrollTrigger Example" },
    {
      name: "description",
      content:
        "Animation example using DotLottie and GSAP ScrollTrigger in React Router",
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
            Animation example using DotLottie and GSAP ScrollTrigger in React
            Router.
            <br />
            This example automatically controls animations based on scroll
            position.
          </p>
        </div>

        <LottieScrollExample />
      </main>
    </div>
  );
}
