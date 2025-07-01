# Vite + React + TypeScript Example

이 예제는 Vite에서 `@jurneyx2/react-lottie-hooks`를 사용하여 DotLottie 애니메이션을 구현하는 방법을 보여줍니다.

## 🚀 실행 방법

```bash
cd examples/vite-example
pnpm install
pnpm dev
# http://localhost:5173에서 확인
```

## ✨ 주요 기능

- ⚡ **빠른 개발 환경**: Vite의 HMR 지원
- 🎨 **Tailwind CSS**: 유틸리티 우선 스타일링
- 🎬 **DotLottie 애니메이션**: 스크롤 트리거 및 수동 제어
- 📱 **반응형 디자인**: 모바일 친화적 UI
- 🔧 **TypeScript**: 타입 안전성

## 사용법

### 1. 온라인 Lottie 파일 사용 (현재 설정)

```tsx
<DotLottieReact
  src="https://lottie.host/4db68bbd-31f6-4cd8-b635-17e6a5c5a7b7/hY2dzw8c69.lottie"
  loop
  autoplay={false}
  dotLottieRefCallback={handleDotLottieRef}
  className="w-full h-full"
/>
```

### 2. 로컬 Lottie 파일 사용

1. `.lottie` 파일을 `public/animations/` 폴더에 넣기
2. 컴포넌트에서 경로 지정:

```tsx
<DotLottieReact
  src="/animations/your-animation.lottie"
  loop
  autoplay={false}
  dotLottieRefCallback={handleDotLottieRef}
  className="w-full h-full"
/>
```

## 📦 의존성

- `@jurneyx2/react-lottie-hooks`: DotLottie 스크롤 훅
- `@lottiefiles/dotlottie-react`: DotLottie React 컴포넌트
- `tailwindcss`: 스타일링
- `vite`: 빌드 도구

## 🔧 설정

### Vite 설정 (`vite.config.ts`)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
```

### Tailwind 설정 (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 🛠️ 개발

### 빌드

```bash
pnpm build
```

### 미리보기

```bash
pnpm preview
```

### 린트

```bash
pnpm lint
```

## 📁 프로젝트 구조

```
examples/vite-example/
├── src/
│   ├── components/
│   │   └── LottieScrollExample.tsx  # 메인 애니메이션 컴포넌트
│   ├── App.tsx                      # 앱 루트 컴포넌트
│   └── main.tsx                     # 앱 엔트리 포인트
├── public/
│   └── animations/                  # 로컬 Lottie 파일들 (선택사항)
├── vite.config.ts                   # Vite 설정
├── tailwind.config.js               # Tailwind CSS 설정
└── package.json                     # 프로젝트 의존성
```
