# Next.js Example

이 예제는 Next.js App Router에서 `@jurneyx2/react-lottie-hooks`를 사용하여 DotLottie 애니메이션을 구현하는 방법을 보여줍니다.

## 🚀 실행 방법

```bash
cd examples/nextjs-example
pnpm install
pnpm dev
# http://localhost:3000에서 확인
```

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

## 실행 방법

```bash
pnpm dev
```

브라우저에서 http://localhost:3000 열기
