# React Lottie Hooks

React hooks for controlling Lottie animations with scroll triggers using GSAP ScrollTrigger.

## Installation

```bash
npm install @Imjurney/react-lottie-hooks
# or
yarn add @Imjurney/react-lottie-hooks
# or
pnpm add @Imjurney/react-lottie-hooks
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom @gsap/react @lottiefiles/dotlottie-react gsap
```

## Usage

```tsx
import { useLottieScrollTrigger } from "@Imjurney/react-lottie-hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function MyComponent() {
  const { triggerRef, handleDotLottieRef } = useLottieScrollTrigger({
    start: "top center",
    end: "bottom 20%",
    debug: true,
    debugLanguage: "ko", // 'ko' | 'en'
  });

  return (
    <div ref={triggerRef}>
      <DotLottieReact
        src="/path/to/your/animation.lottie"
        loop
        autoplay={false}
        dotLottieRefCallback={handleDotLottieRef}
      />
    </div>
  );
}
```

## API

### Options

| Option          | Type                             | Default                                  | Description                  |
| --------------- | -------------------------------- | ---------------------------------------- | ---------------------------- |
| `start`         | `string`                         | `'top center'`                           | ScrollTrigger start position |
| `end`           | `string`                         | `'bottom 20%'`                           | ScrollTrigger end position   |
| `markers`       | `boolean`                        | `process.env.NODE_ENV === 'development'` | Show ScrollTrigger markers   |
| `pauseOnLoad`   | `boolean`                        | `true`                                   | Pause animation on load      |
| `debug`         | `boolean`                        | `false`                                  | Enable debug logging         |
| `debugLanguage` | `'ko' \| 'en'`                   | `'ko'`                                   | Debug message language       |
| `onEnter`       | `(dotLottie: DotLottie) => void` | -                                        | Custom enter callback        |
| `onLeave`       | `(dotLottie: DotLottie) => void` | -                                        | Custom leave callback        |
| `onEnterBack`   | `(dotLottie: DotLottie) => void` | -                                        | Custom enter back callback   |
| `onLeaveBack`   | `(dotLottie: DotLottie) => void` | -                                        | Custom leave back callback   |

### Return Value

| Property             | Type                             | Description                             |
| -------------------- | -------------------------------- | --------------------------------------- |
| `triggerRef`         | `RefObject<HTMLDivElement>`      | Ref to attach to scroll trigger element |
| `handleDotLottieRef` | `(dotLottie: DotLottie) => void` | Callback for DotLottie ref              |
| `dotLottie`          | `DotLottie \| null`              | DotLottie instance                      |
| `isLottieLoaded`     | `boolean`                        | Whether Lottie is loaded                |
| `isMounted`          | `boolean`                        | Whether component is mounted            |
| `play`               | `() => void`                     | Play animation                          |
| `pause`              | `() => void`                     | Pause animation                         |
| `stop`               | `() => void`                     | Stop animation                          |
| `setFrame`           | `(frame: number) => void`        | Set animation frame                     |
| `isPlaying`          | `boolean`                        | Whether animation is playing            |
| `currentFrame`       | `number`                         | Current animation frame                 |

## Debug Languages

The hook supports both Korean and English debug messages:

```tsx
// 한국어 디버그 메시지
useLottieScrollTrigger({ debug: true, debugLanguage: "ko" });

// English debug messages
useLottieScrollTrigger({ debug: true, debugLanguage: "en" });
```

## License

MIT
