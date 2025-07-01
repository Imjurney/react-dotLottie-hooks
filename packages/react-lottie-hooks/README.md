# 🎯 React Lottie Hooks v1.2.2 (DotLottie)

**Simple and powerful React hooks for DotLottie animations with GSAP ScrollTrigger**

> ✨ Easily implement scroll-based animations with React hooks optimized exclusively for DotLottie!
>
> **v1.2.1 is the stable release** - A mature and reliable DotLottie-only solution

## 🚀 Features

- 🎨 **DotLottie Exclusive**: Perfect support for `@lottiefiles/dotlottie-react`
- 📱 **SSR/CSR Safe**: Full compatibility with SSR frameworks like Next.js, Remix, React Router
- 🎯 **GSAP ScrollTrigger**: Scroll-based animations and effects
- 🔧 **TypeScript**: Complete type safety
- 🎪 **Simple API**: Ready to use without complex configuration
- ⚡ **Optimized**: Performance and memory efficiency optimized
- 🎨 **4 Examples**: Complete support for Next.js, Vite, Remix, React Router

## 📦 Installation

```bash
# npm (recommended)
npm install @jurneyx2/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# pnpm
pnpm add @jurneyx2/react-lottie-hooks @lottiefiles/dotlottie-react gsap

# yarn
yarn add @jurneyx2/react-lottie-hooks @lottiefiles/dotlottie-react gsap
```

## 🎯 Basic Usage

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
      {/* Scroll trigger area */}
      <div ref={triggerRef} style={{ height: "100vh" }}>
        <h2>Animation starts when you scroll!</h2>

        {/* DotLottie animation */}
        <DotLottieReact
          src="/animations/my-animation.lottie"
          loop={false}
          autoplay={false}
          dotLottieRefCallback={handleDotLottieRef}
          className="w-full h-full"
        />
      </div>

      {isLoaded && <p>Animation has been loaded! ✨</p>}
    </div>
  );
}
```

## 🎨 Advanced Usage

### Using with GSAP Animations

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

  // GSAP animation effects
  gsapAnimations: {
    scale: 1.2,
    rotation: 360,
    opacity: 0.8,
    duration: 2,
    ease: "power2.out",
    trigger: "enter",
    scrub: true, // Sync with scroll
  },

  // Custom event handlers
  onEnter: (dotLottie) => {
    console.log("Entered animation area!");
    dotLottie.setSpeed(1.5);
  },
```

### Performance Optimized Usage

```tsx
function PerformanceOptimizedLottie() {
  const {
    triggerRef,
    handleDotLottieRef,
    getCurrentFrame, // ref-based getter (no re-renders)
    getIsPlaying,    // ref-based getter (no re-renders)
    play,
    pause,
  } = useLottieScrollTrigger({
    // Disable React state tracking (default: false)
    enableStateTracking: false,

    // Monitor state through callbacks
    onPlayStateChange: (isPlaying) => {
      console.log('Play state changed:', isPlaying);
    },
    onFrameChange: (frame) => {
      console.log('Frame changed:', frame);
      // Update external state or UI (only when needed)
    },

    // Adjust frame update throttle (ms)
    frameUpdateThrottle: 50, // default: 100ms
  });

  const handlePlayToggle = () => {
    // Check current state via ref (no re-renders)
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
        Play/Pause
      </button>
      <div>
        {/* Get current frame via ref (no re-renders) */}
        Current frame: {getCurrentFrame()}
      </div>
    </div>
  );
}
````

### Scroll Progress Tracking

```tsx
function ScrollProgress() {
  const { triggerRef, handleDotLottieRef } = useLottieScrollTrigger({
    start: "top center",
    end: "bottom center",
    // onScrollUpdate has been removed in v1.2.0
    // Use callbacks like onEnter, onLeave instead
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

### Safe Usage in SSR Environment

```tsx
// Next.js App Router
export default function MyPage() {
  const { triggerRef, handleDotLottieRef, isClient, isDOMReady, isLoaded } =
    useLottieScrollTrigger({
      strictMode: true, // Auto-enabled in SSR frameworks
      waitForDOMReady: true, // Wait for complete DOM load
      debug: true,
    });

  // Render only on client
  if (!isClient || !isDOMReady) {
    return <div>Loading...</div>;
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

## 📋 API Reference

### `useLottieScrollTrigger(options)`

#### Options

```typescript
interface UseLottieScrollTriggerOptions {
  // ScrollTrigger basic settings
  start?: string; // default: "top center"
  end?: string; // default: "bottom 20%"
  markers?: boolean; // default: true only in development
  pauseOnLoad?: boolean; // default: true

  // Debugging
  debug?: boolean; // default: false
  debugLanguage?: "ko" | "en"; // default: "ko"

  // SSR/CSR safety
  strictMode?: boolean; // default: auto true in SSR frameworks
  waitForDOMReady?: boolean; // default: auto true in SSR frameworks

  // Performance optimization options (re-render control)
  enableStateTracking?: boolean; // default: false (disable React state tracking)
  frameUpdateThrottle?: number; // default: 100 (ms)
  onPlayStateChange?: (isPlaying: boolean) => void; // Play state change callback
  onFrameChange?: (currentFrame: number) => void; // Frame change callback

  // DotLottie event callbacks
  onEnter?: (dotLottie: DotLottie) => void;
  onLeave?: (dotLottie: DotLottie) => void;
  onEnterBack?: (dotLottie: DotLottie) => void;
  onLeaveBack?: (dotLottie: DotLottie) => void;

  // GSAP animations
  gsapAnimations?: {
    rotation?: number; // Rotation angle
    scale?: number; // Scale factor
    x?: number; // X-axis movement
    y?: number; // Y-axis movement
    opacity?: number; // Opacity
    duration?: number; // Animation duration
    ease?: string; // Easing function
    trigger?: "enter" | "enterBack" | "leave" | "leaveBack" | "scroll";
    scrub?: boolean | number; // Sync with scroll
  };

  // Additional ScrollTrigger options
  scrollTriggerOptions?: Partial<ScrollTrigger.StaticVars>;
}
```

#### Return Value

```typescript
interface UseLottieScrollTriggerReturn {
  // Required refs
  triggerRef: React.RefObject<HTMLDivElement>;
  handleDotLottieRef: (dotLottie: DotLottie | null) => void;

  // DotLottie instance and state
  dotLottie: DotLottie | null;
  isDotLottieLoaded: boolean;

  // Control functions
  play: () => void;
  pause: () => void;
  stop: () => void;
  setFrame: (frame: number) => void;

  // Performance optimized state access
  getCurrentFrame: () => number; // ref-based getter (no re-renders)
  getIsPlaying: () => boolean; // ref-based getter (no re-renders)

  // React state (updates only when enableStateTracking is true)
  isPlaying: boolean; // always false if enableStateTracking is false
  currentFrame: number; // always 0 if enableStateTracking is false

  // Environment and loading state
  isMounted: boolean;
  isDOMReady: boolean;
  isClient: boolean;
  isLoaded: boolean;
  isSSRFramework: boolean;
  isNextJS: boolean;
  isNuxt: boolean;
}
```

## ⚡ Performance Optimization

### Minimize Re-renders

By default, `useLottieScrollTrigger` disables React state tracking for performance:

```typescript
// 🚀 High performance mode (default)
const { getCurrentFrame, getIsPlaying } = useLottieScrollTrigger({
  enableStateTracking: false, // default
});

// Check state via ref (no re-renders)
console.log(getCurrentFrame()); // Current frame
console.log(getIsPlaying()); // Play state
```

### Selective State Tracking

Enable only when you need to display animation state in UI:

```typescript
// 🎯 Track state only when needed
const { isPlaying, currentFrame } = useLottieScrollTrigger({
  enableStateTracking: true, // Enable React state updates
  frameUpdateThrottle: 200, // Limit frame updates to 200ms
  onFrameChange: (frame) => {
    // External state management or UI updates
    setExternalState(frame);
  },
});
```

### Callback-based State Monitoring

```typescript
// 📊 Performance optimization with callbacks
const { play, pause } = useLottieScrollTrigger({
  enableStateTracking: false, // Prevent re-renders
  onPlayStateChange: (isPlaying) => {
    // Update external state only when needed
    updateExternalPlayState(isPlaying);
  },
  onFrameChange: (frame) => {
    // Update progress bar etc.
    updateProgressBar(frame);
  },
});
```

### Frame Update Throttling

```typescript
const hook = useLottieScrollTrigger({
  frameUpdateThrottle: 100, // default: 100ms (10fps)
  // frameUpdateThrottle: 16,  // For 60fps when needed
  // frameUpdateThrottle: 50,  // 20fps compromise
});
```

### Performance Monitoring

```typescript
const hook = useLottieScrollTrigger({
  debug: true, // Check performance logs in console
  onFrameChange: (frame) => {
    console.log(`Frame update: ${frame}`);
  },
});
```

## 🛠️ Troubleshooting

### Common Issues

**Q: Animation won't play**

```typescript
// 1. Check DotLottie load status
const { isLoaded, isDotLottieLoaded } = useLottieScrollTrigger({ debug: true });

// 2. Make sure autoplay is set to false
<DotLottieReact autoplay={false} />;

// 3. Check pauseOnLoad option
useLottieScrollTrigger({ pauseOnLoad: true }); // Pause after load
```

**Q: Getting errors in SSR environment**

```typescript
// Enable strictMode and waitForDOMReady
const hook = useLottieScrollTrigger({
  strictMode: true,
  waitForDOMReady: true,
});

// Render only on client
if (!hook.isClient || !hook.isDOMReady) {
  return <div>Loading...</div>;
}
```

**Q: ScrollTrigger not working**

```typescript
// 1. Check if triggerRef is properly set
<div ref={triggerRef}>
  <DotLottieReact dotLottieRefCallback={handleDotLottieRef} />
</div>

// 2. Verify GSAP is correctly installed
npm list gsap

// 3. Debug the issue with debug mode
useLottieScrollTrigger({ debug: true, markers: true })
```

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [@lottiefiles/dotlottie-react](https://github.com/LottieFiles/dotlottie-react) - Excellent DotLottie React component
- [GSAP](https://greensock.com/gsap/) - Powerful animation library
- All contributors in the React community

---

**💡 For more examples and documentation, visit the [GitHub Repository](https://github.com/Imjurney/react-dotLottie-hooks)!**
