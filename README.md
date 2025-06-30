# 🎯 React DotLottie Hooks

**모던한 React 애플리케이션을 위한 간단하고 강력한 DotLottie 애니메이션 훅**

> ✨ DotLottie + GSAP ScrollTrigger로 멋진 스크롤 애니메이션을 쉽게 만들어보세요!

## 📁 프로젝트 구조

```
pnpm-monorepo/
├── packages/
│   └── react-lottie-hooks/     # 🎯 메인 훅 라이브러리
└── examples/
    ├── nextjs-example/         # Next.js 예제
    └── vite-example/           # Vite 예제
```

## 🚀 빠른 시작

### 1. 패키지 설치

```bash
# pnpm (권장)
pnpm add @Imjurney/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# npm
npm install @Imjurney/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# yarn
yarn add @Imjurney/react-lottie-hooks @lottiefiles/dotlottie-react gsap
```

### 2. 기본 사용법

```tsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useLottieScrollTrigger } from "@Imjurney/react-lottie-hooks";

export default function MyComponent() {
  const { triggerRef, lottieContainerRef, handleDotLottieRef, isLoaded } =
    useLottieScrollTrigger({
      start: "top center",
      end: "bottom center",
      debug: process.env.NODE_ENV === "development",
    });

  return (
    <div>
      {/* 스크롤 트리거 영역 */}
      <div ref={triggerRef} style={{ height: "100vh" }}>
        <h2>스크롤하면 애니메이션이 시작됩니다!</h2>
      </div>

      {/* DotLottie 애니메이션 */}
      <div ref={lottieContainerRef}>
        <DotLottieReact
          src="/my-animation.lottie"
          loop={false}
          autoplay={false}
          dotLottieRefCallback={handleDotLottieRef}
        />
      </div>

      {isLoaded && <p>애니메이션 로드 완료! ✨</p>}
    </div>
  );
}
```

## 📦 패키지

### [@Imjurney/react-lottie-hooks](./packages/react-lottie-hooks)

메인 훅 라이브러리입니다.

**주요 특징:**

- 🎨 **DotLottie 전용**: `@lottiefiles/dotlottie-react` 완벽 지원
- 📱 **SSR/CSR 안전**: Next.js, Nuxt.js 등 완벽 지원
- 🎯 **GSAP ScrollTrigger**: 스크롤 기반 애니메이션
- 🔧 **TypeScript**: 완전한 타입 안전성
- ⚡ **최적화**: 성능과 메모리 효율성

## 🎨 예제

### Next.js 예제

- 📁 [examples/nextjs-example](./examples/nextjs-example)
- 🌐 App Router 사용
- ✨ 기본 & 고급 애니메이션 데모
- 🎯 SSR 안전성 시연

### Vite 예제

- 📁 [examples/vite-example](./examples/vite-example)
- ⚡ 빠른 개발 환경
- 🎨 다양한 사용 사례

## 🛠️ 개발

### 요구사항

- Node.js 16+
- pnpm 8+

### 설치

```bash
git clone <repository-url>
cd pnpm-monorepo
pnpm install
```

### 빌드

```bash
# 전체 빌드
pnpm build

# 패키지만 빌드
pnpm build:packages

# 예제만 빌드
pnpm build:examples
```

### 개발 서버 실행

```bash
# 모든 예제 실행
pnpm dev

# 특정 예제만 실행
cd examples/nextjs-example
pnpm dev
```

## 🆚 v3.0.0 주요 변경사항

### ✅ 개선된 점

- **단순화**: DotLottie 전용으로 API가 훨씬 간단해졌습니다
- **성능**: 단일 라이브러리 지원으로 번들 크기 감소
- **안정성**: 복잡한 하이브리드 로직 제거
- **타입 안전성**: DotLottie 전용 타입으로 더 정확함

### 💔 Breaking Changes

- `mode` 옵션 제거 (DotLottie만 지원)
- `animationData`, `path`, `renderer` 등 lottie-web 옵션 제거
- `lottie-web` 의존성 완전 제거

자세한 마이그레이션 가이드는 [CHANGELOG.md](./packages/react-lottie-hooks/CHANGELOG.md)를 참조하세요.

## 📖 자세한 문서

- 📋 [API 문서](./packages/react-lottie-hooks/README.md)
- 📝 [변경 기록](./packages/react-lottie-hooks/CHANGELOG.md)
- 🎯 [예제 코드](./examples/)

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'feat: add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [@lottiefiles/dotlottie-react](https://github.com/LottieFiles/dotlottie-react) - 훌륭한 DotLottie React 컴포넌트
- [GSAP](https://greensock.com/gsap/) - 강력한 애니메이션 라이브러리
- React 커뮤니티의 모든 기여자들

---

**💡 궁금한 점이 있으시면 Issues에 남겨주세요!**

## 📚 참고 자료

- [블로그 글](https://velog.io/@younyikim/Pnpm%EC%9C%BC%EB%A1%9C-Monorepo-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-2.-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%B6%95Vite-React-TypeScript)
- [pnpm workspace 공식 문서](https://pnpm.io/workspaces)
- [모노레포 설정 가이드](https://github.com/pnpm/pnpm)
- [TypeScript 설정 가이드](https://www.typescriptlang.org/tsconfig)
