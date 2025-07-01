# 🎯 React Lottie Hooks v1.2.0 (DotLottie)

**간단하고 강력한 React DotLottie 애니메이션 훅 with GSAP ScrollTrigger**

> ✨ DotLottie 전용으로 최적화된 React 훅으로 스크롤 기반 애니메이션을 쉽게 구현하세요!
>
> **v1.2.0은 최종 버전입니다** - 안정적이고 완성도 높은 DotLottie 전용 솔루션

## 🚀 특징

- 🎨 **DotLottie 전용**: `@lottiefiles/dotlottie-react` 완벽 지원
- 📱 **SSR/CSR 안전**: Next.js, Remix, React Router 등 SSR 프레임워크 완벽 지원
- 🎯 **GSAP ScrollTrigger**: 스크롤 기반 애니메이션과 효과
- 🔧 **TypeScript**: 완전한 타입 안전성
- 🎪 **간단한 API**: 복잡한 설정 없이 바로 사용 가능
- ⚡ **최적화**: 성능과 메모리 효율성에 최적화
- 🎨 **4가지 예제**: Next.js, Vite, Remix, React Router 완전 지원

## 📦 설치

```bash
# npm (권장)
npm install @jurneyx2/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# pnpm
pnpm add @jurneyx2/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# yarn
yarn add @jurneyx2/react-lottie-hooks @lottiefiles/dotlottie-react gsap
```

## 🎯 기본 사용법

```tsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useLottieScrollTrigger } from "@jurneyx2/react-lottie-hooks";

export default function ScrollAnimation() {
  const { triggerRef, handleDotLottieRef, isLoaded } = useLottieScrollTrigger({
    start: "top center",
    end: "bottom 20%",
    debug: process.env.NODE_ENV === "development",
  });

  return (
    <div>
      {/* 스크롤 트리거 영역 */}
      <div ref={triggerRef} style={{ height: "100vh" }}>
        <h2>스크롤하면 애니메이션이 시작됩니다!</h2>

        {/* DotLottie 애니메이션 */}
        <DotLottieReact
          src="/animations/my-animation.lottie"
          loop={false}
          autoplay={false}
          dotLottieRefCallback={handleDotLottieRef}
          className="w-full h-full"
        />
      </div>

      {isLoaded && <p>애니메이션이 로드되었습니다! ✨</p>}
    </div>
  );
}
```

## 🎨 고급 사용법

### GSAP 애니메이션과 함께 사용

````tsx
const {
  triggerRef,
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

### 성능 최적화 사용법

```tsx
function PerformanceOptimizedLottie() {
  const {
    triggerRef,
    handleDotLottieRef,
    getCurrentFrame, // ref 기반 getter (리랜더링 없음)
    getIsPlaying,    // ref 기반 getter (리랜더링 없음)
    play,
    pause,
  } = useLottieScrollTrigger({
    // React state 추적 비활성화 (기본값: false)
    enableStateTracking: false,

    // 콜백을 통한 상태 모니터링
    onPlayStateChange: (isPlaying) => {
      console.log('재생 상태 변경:', isPlaying);
    },
    onFrameChange: (frame) => {
      console.log('프레임 변경:', frame);
      // 외부 상태나 UI 업데이트 (필요할 때만)
    },

    // 프레임 업데이트 throttle 조정 (ms)
    frameUpdateThrottle: 50, // 기본값: 100ms
  });

  const handlePlayToggle = () => {
    // ref 기반으로 현재 상태 확인 (리랜더링 없음)
    if (getIsPlaying()) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div ref={triggerRef}>
      <DotLottieReact
        src="/animation.lottie"
        loop={false}
        autoplay={false}
        dotLottieRefCallback={handleDotLottieRef}
      />
      <button onClick={handlePlayToggle}>
        재생/일시정지
      </button>
      <div>
        {/* 현재 프레임은 ref로 가져오기 (리랜더링 없음) */}
        현재 프레임: {getCurrentFrame()}
      </div>
    </div>
  );
}
````

### 스크롤 진행률 추적

```tsx
function ScrollProgress() {
  const { triggerRef, handleDotLottieRef } = useLottieScrollTrigger({
    start: "top center",
    end: "bottom center",
    // v1.2.0에서 onScrollUpdate는 제거되었습니다
    // 대신 onEnter, onLeave 등의 콜백을 사용하세요
  });

  return (
    <div ref={triggerRef} className="h-screen">
      <DotLottieReact
        src="/scroll-animation.lottie"
        loop={false}
        autoplay={false}
        dotLottieRefCallback={handleDotLottieRef}
        className="w-full h-full"
      />
    </div>
  );
}
```

### SSR 환경에서 안전한 사용

```tsx
// Next.js App Router
export default function MyPage() {
  const { triggerRef, handleDotLottieRef, isClient, isDOMReady, isLoaded } =
    useLottieScrollTrigger({
      strictMode: true, // SSR 프레임워크에서 자동 활성화
      waitForDOMReady: true, // DOM 완전 로드 대기
      debug: true,
    });

  // 클라이언트에서만 렌더링
  if (!isClient || !isDOMReady) {
    return <div>로딩 중...</div>;
  }

  return (
    <div ref={triggerRef} className="h-screen">
      <DotLottieReact
        src="/animations/hero.lottie"
        loop={false}
        autoplay={false}
        dotLottieRefCallback={handleDotLottieRef}
        className="w-full h-full"
      />
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

  // 성능 최적화 옵션 (리랜더링 제어)
  enableStateTracking?: boolean; // 기본값: false (React state 추적 비활성화)
  frameUpdateThrottle?: number; // 기본값: 100 (ms)
  onPlayStateChange?: (isPlaying: boolean) => void; // 재생 상태 변경 콜백
  onFrameChange?: (currentFrame: number) => void; // 프레임 변경 콜백

  // DotLottie 이벤트 콜백
  onEnter?: (dotLottie: DotLottie) => void;
  onLeave?: (dotLottie: DotLottie) => void;
  onEnterBack?: (dotLottie: DotLottie) => void;
  onLeaveBack?: (dotLottie: DotLottie) => void;

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
  handleDotLottieRef: (dotLottie: DotLottie | null) => void;

  // DotLottie 인스턴스와 상태
  dotLottie: DotLottie | null;
  isDotLottieLoaded: boolean;

  // 제어 함수들
  play: () => void;
  pause: () => void;
  stop: () => void;
  setFrame: (frame: number) => void;

  // 성능 최적화된 상태 접근
  getCurrentFrame: () => number; // ref 기반 getter (리랜더링 없음)
  getIsPlaying: () => boolean; // ref 기반 getter (리랜더링 없음)

  // React state (enableStateTracking이 true일 때만 업데이트)
  isPlaying: boolean; // enableStateTracking이 false면 항상 false
  currentFrame: number; // enableStateTracking이 false면 항상 0

  // 환경 및 로딩 상태
  isMounted: boolean;
  isDOMReady: boolean;
  isClient: boolean;
  isLoaded: boolean;
  isSSRFramework: boolean;
  isNextJS: boolean;
  isNuxt: boolean;
}
```

## ⚡ 성능 최적화

### 리랜더링 최소화

기본적으로 `useLottieScrollTrigger`는 성능을 위해 React state 추적을 비활성화합니다:

```typescript
// 🚀 고성능 모드 (기본값)
const { getCurrentFrame, getIsPlaying } = useLottieScrollTrigger({
  enableStateTracking: false, // 기본값
});

// ref 기반으로 상태 확인 (리랜더링 없음)
console.log(getCurrentFrame()); // 현재 프레임
console.log(getIsPlaying()); // 재생 상태
```

### 선택적 상태 추적

UI에서 애니메이션 상태를 표시해야 할 때만 활성화:

```typescript
// 🎯 필요할 때만 상태 추적
const { isPlaying, currentFrame } = useLottieScrollTrigger({
  enableStateTracking: true, // React state 업데이트 활성화
  frameUpdateThrottle: 200, // 프레임 업데이트를 200ms로 제한
  onFrameChange: (frame) => {
    // 외부 상태 관리나 UI 업데이트
    setExternalState(frame);
  },
});
```

### 콜백 기반 상태 모니터링

```typescript
// 📊 콜백으로 성능 최적화
const { play, pause } = useLottieScrollTrigger({
  enableStateTracking: false, // 리랜더링 방지
  onPlayStateChange: (isPlaying) => {
    // 필요한 경우에만 외부 상태 업데이트
    updateExternalPlayState(isPlaying);
  },
  onFrameChange: (frame) => {
    // progress bar 업데이트 등
    updateProgressBar(frame);
  },
});
```

### 프레임 업데이트 throttling

```typescript
const hook = useLottieScrollTrigger({
  frameUpdateThrottle: 100, // 기본값: 100ms (10fps)
  // frameUpdateThrottle: 16,  // 60fps가 필요한 경우
  // frameUpdateThrottle: 50,  // 20fps로 절충
});
```

### 성능 모니터링

```typescript
const hook = useLottieScrollTrigger({
  debug: true, // 콘솔에서 성능 로그 확인
  onFrameChange: (frame) => {
    console.log(`프레임 업데이트: ${frame}`);
  },
});
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
  <DotLottieReact dotLottieRefCallback={handleDotLottieRef} />
</div>

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
