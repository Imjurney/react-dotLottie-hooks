# 🚦 React Router + DotLottie ScrollTrigger 예제

React Router 7에서 `@Imjurney/react-lottie-hooks`를 사용한 실제 구현 예제입니다.

## 🚀 빠른 시작

### 개발 서버 실행

```bash
pnpm dev
```

http://localhost:5173 에서 확인하세요.

### 빌드

```bash
pnpm build
```

### 서버 시작

```bash
pnpm start
```

## 🎯 구현된 기능

### 기본 스크롤 애니메이션

- DotLottie 파일 로드 및 재생
- GSAP ScrollTrigger 기반 스크롤 제어
- 성능 최적화된 상태 관리

### 고급 제어 기능

- 수동/자동 제어 모드 전환
- 실시간 상태 모니터링
- 디버깅 정보 표시

### SSR/CSR 안전성

- 서버사이드 렌더링 호환
- 클라이언트 하이드레이션 안전

## 🎨 스타일링

- **Tailwind CSS 4.0**: 최신 @theme 구문 사용
- **반응형 디자인**: 모바일부터 데스크톱까지
- **접근성**: 포커스 링과 키보드 네비게이션
- **다크 모드**: 시스템 설정 자동 감지

## 📦 주요 의존성

- **React Router**: 최신 7.x 버전
- **@Imjurney/react-lottie-hooks**: DotLottie ScrollTrigger 훅
- **@lottiefiles/dotlottie-react**: DotLottie React 컴포넌트
- **GSAP**: 애니메이션 라이브러리
- **Tailwind CSS**: 유틸리티 CSS 프레임워크

## 🏗️ 프로젝트 구조

```
react-router-example/
├── app/
│   ├── components/
│   │   └── LottieScrollExample.tsx  # 메인 컴포넌트
│   ├── routes/
│   │   └── home.tsx                 # 홈 라우트
│   ├── root.tsx                     # 루트 레이아웃
│   ├── app.css                      # Tailwind 엔트리포인트
│   └── routes.ts                    # 라우트 설정
├── public/
│   └── animation.lottie             # 애니메이션 파일
├── package.json
├── react-router.config.ts           # React Router 설정
├── tsconfig.json                    # TypeScript 설정
└── vite.config.ts                   # Vite 설정
```

## 🔧 기술 스택

- **React Router**: 7.5+
- **React**: 19.1
- **TypeScript**: 5.8
- **Vite**: 6.3
- **Tailwind CSS**: 4.1
- **GSAP**: 3.13

## 📱 반응형 특징

- **데스크톱**: 전체 기능과 가로 레이아웃
- **모바일**: 세로 스택 레이아웃과 터치 최적화
- **태블릿**: 적응형 그리드와 간격 조정
- **다크 모드**: 자동 시스템 테마 감지

## ⚡ 성능 최적화

- **파일 기반 라우팅**: React Router 7의 새로운 라우팅 시스템
- **자동 코드 분할**: 라우트별 청크 분리
- **메모이제이션**: 불필요한 리랜더링 방지
- **SSR**: 서버사이드 렌더링 지원

## 🐛 디버깅

개발 모드에서는 다음 디버깅 도구를 사용할 수 있습니다:

- **GSAP 마커**: 스크롤 트리거 위치 시각화
- **상태 로깅**: 애니메이션 상태 콘솔 출력
- **실시간 정보**: UI에서 상태 확인

## 🆕 React Router 7 특징

- **파일 기반 라우팅**: `app/routes/` 디렉토리 구조
- **타입 안전성**: 완전한 TypeScript 지원
- **성능 개선**: 향상된 번들링과 최적화
- **개발자 경험**: 더 나은 DX와 디버깅 도구

## 📖 더 알아보기

- [React Router 7 공식 문서](https://reactrouter.com/start/library/installation)
- [@Imjurney/react-lottie-hooks 문서](../../packages/react-lottie-hooks/README.md)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [GSAP ScrollTrigger 문서](https://greensock.com/scrolltrigger/)

---

**💡 팁**: 이 예제는 최신 React Router 7 아키텍처를 기반으로 구축되었습니다!

- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
