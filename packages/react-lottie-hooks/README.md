# 🎯 React Lottie Hooks (DotLottie)

**간단하고 강력한 React DotLottie 애니메이션 훅 with GSAP ScrollTrigger**

> ✨ DotLottie 전용으로 최적화된 React 훅으로 스크롤 기반 애니메이션을 쉽게 구현하세요!

## 🚀 특징

- 🎨 **DotLottie 전용**: `@lottiefiles/dotlottie-react` 완벽 지원
- 📱 **SSR/CSR 안전**: Next.js, Nuxt.js 등 SSR 프레임워크 완벽 지원
- 🎯 **GSAP ScrollTrigger**: 스크롤 기반 애니메이션과 효과
- 🔧 **TypeScript**: 완전한 타입 안전성
- 🎪 **간단한 API**: 복잡한 설정 없이 바로 사용 가능
- ⚡ **최적화**: 성능과 메모리 효율성에 최적화

## 📦 설치

```bash
# pnpm (권장)
pnpm add @Imjurney/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# npm
npm install @Imjurney/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# yarn
yarn add @Imjurney/react-lottie-hooks @lottiefiles/dotlottie-react gsap
```

## 🎯 기본 사용법

```tsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useLottieScrollTrigger } from "@Imjurney/react-lottie-hooks";

export default function ScrollAnimation() {
  const { triggerRef, lottieContainerRef, handleDotLottieRef, isLoaded } =
    useLottieScrollTrigger({
      start: "top center",
      end: "bottom 20%",
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
          src="/animations/my-animation.lottie"
          loop={false}
          autoplay={false}
          dotLottieRefCallback={handleDotLottieRef}
        />
      </div>

      {isLoaded && <p>애니메이션이 로드되었습니다! ✨</p>}
    </div>
  );
}
```

## 🎨 고급 사용법

### GSAP 애니메이션과 함께 사용

```tsx
const {
  triggerRef,
  lottieContainerRef,
  handleDotLottieRef,
  play,
  pause,
  currentFrame,
} = useLottieScrollTrigger({
  start: "top bottom",
  end: "bottom top",

  // GSAP 애니메이션 효과
  gsapAnimations: {
    scale: 1.2,
    rotation: 360,
    opacity: 0.8,
    duration: 2,
    ease: "power2.out",
    trigger: "enter",
    scrub: true, // 스크롤과 동기화
  },

  // 커스텀 이벤트 핸들러
  onEnter: (dotLottie) => {
    console.log("애니메이션 영역 진입!");
    dotLottie.setSpeed(1.5);
  },

  onScrollUpdate: (progress) => {
    console.log(`스크롤 진행률: ${Math.round(progress * 100)}%`);
  },
});
```

### SSR 환경에서 안전한 사용

```tsx
// Next.js App Router
export default function MyPage() {
  const {
    triggerRef,
    lottieContainerRef,
    handleDotLottieRef,
    isClient,
    isDOMReady,
    isLoaded,
  } = useLottieScrollTrigger({
    strictMode: true, // SSR 프레임워크에서 자동 활성화
    waitForDOMReady: true, // DOM 완전 로드 대기
    debug: true,
  });

  // 클라이언트에서만 렌더링
  if (!isClient || !isDOMReady) {
    return <div>로딩 중...</div>;
  }

  return (
    <div ref={triggerRef}>
      <div ref={lottieContainerRef}>
        <DotLottieReact
          src="/animations/hero.lottie"
          loop={false}
          autoplay={false}
          dotLottieRefCallback={handleDotLottieRef}
        />
      </div>
    </div>
  );
}
```

## 📋 API 참조

### `useLottieScrollTrigger(options)`

#### Options

```typescript
interface UseLottieScrollTriggerOptions {
  // ScrollTrigger 기본 설정
  start?: string; // 기본값: "top center"
  end?: string; // 기본값: "bottom 20%"
  markers?: boolean; // 기본값: development 환경에서만 true
  pauseOnLoad?: boolean; // 기본값: true

  // 디버깅
  debug?: boolean; // 기본값: false
  debugLanguage?: "ko" | "en"; // 기본값: "ko"

  // SSR/CSR 안전성
  strictMode?: boolean; // 기본값: SSR 프레임워크에서 자동 true
  waitForDOMReady?: boolean; // 기본값: SSR 프레임워크에서 자동 true

  // DotLottie 이벤트 콜백
  onEnter?: (dotLottie: DotLottie) => void;
  onLeave?: (dotLottie: DotLottie) => void;
  onEnterBack?: (dotLottie: DotLottie) => void;
  onLeaveBack?: (dotLottie: DotLottie) => void;

  // 스크롤 진행률 콜백
  onScrollUpdate?: (progress: number) => void;

  // GSAP 애니메이션
  gsapAnimations?: {
    rotation?: number; // 회전 각도
    scale?: number; // 크기 배율
    x?: number; // X축 이동
    y?: number; // Y축 이동
    opacity?: number; // 투명도
    duration?: number; // 애니메이션 지속시간
    ease?: string; // 이징 함수
    trigger?: "enter" | "enterBack" | "leave" | "leaveBack" | "scroll";
    scrub?: boolean | number; // 스크롤과 동기화
  };

  // 추가 ScrollTrigger 옵션
  scrollTriggerOptions?: Partial<ScrollTrigger.StaticVars>;
}
```

#### Return Value

```typescript
interface UseLottieScrollTriggerReturn {
  // 필수 ref들
  triggerRef: React.RefObject<HTMLDivElement>;
  lottieContainerRef: React.RefObject<HTMLDivElement>;
  handleDotLottieRef: (dotLottie: DotLottie | null) => void;

  // DotLottie 인스턴스와 상태
  dotLottie: DotLottie | null;
  isDotLottieLoaded: boolean;

  // 제어 함수들
  play: () => void;
  pause: () => void;
  stop: () => void;
  setFrame: (frame: number) => void;

  // 상태 정보
  isPlaying: boolean;
  currentFrame: number;
  isLoaded: boolean;

  // 환경 정보
  isMounted: boolean;
  isDOMReady: boolean;
  isClient: boolean;
  isSSRFramework: boolean;
  isNextJS: boolean;
  isNuxt: boolean;
}
```

## 🛠️ 문제해결

### 일반적인 문제들

**Q: 애니메이션이 재생되지 않아요**

```typescript
// 1. DotLottie 로드 상태 확인
const { isLoaded, isDotLottieLoaded } = useLottieScrollTrigger({ debug: true });

// 2. autoplay를 false로 설정했는지 확인
<DotLottieReact autoplay={false} />;

// 3. pauseOnLoad 옵션 확인
useLottieScrollTrigger({ pauseOnLoad: true }); // 로드 후 일시정지
```

**Q: SSR 환경에서 에러가 발생해요**

```typescript
// strictMode와 waitForDOMReady 활성화
const hook = useLottieScrollTrigger({
  strictMode: true,
  waitForDOMReady: true,
});

// 클라이언트에서만 렌더링
if (!hook.isClient || !hook.isDOMReady) {
  return <div>Loading...</div>;
}
```

**Q: ScrollTrigger가 작동하지 않아요**

```typescript
// 1. triggerRef가 올바르게 설정되었는지 확인
<div ref={triggerRef}>

// 2. GSAP가 올바르게 설치되었는지 확인
npm list gsap

// 3. 디버그 모드로 문제 확인
useLottieScrollTrigger({ debug: true, markers: true })
```

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

**💡 더 많은 예제와 문서는 [GitHub Repository](https://github.com/your-username/your-repo-name)에서 확인하세요!**
