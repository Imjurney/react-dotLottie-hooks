import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@lottiefiles/dotlottie-react",
    "gsap",
    "@gsap/react",
  ],
  esbuildOptions(options) {
    options.alias = {
      ...options.alias,
      "gsap/ScrollTrigger": "gsap/ScrollTrigger.js",
    };
  },
  outDir: "dist",
  sourcemap: false, // 프로덕션 라이브러리에서는 소스맵 비활성화
  splitting: false,
  treeshake: true,
});
