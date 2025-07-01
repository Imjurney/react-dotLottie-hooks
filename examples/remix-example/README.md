# 🎭 Remix + DotLottie ScrollTrigger 예제

Remix 프레임워크에서 `@jurneyx2/react-lottie-hooks`를 사용한 실제 구현 예제입니다.

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

### 미리보기

```bash
pnpm preview
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

- **Tailwind CSS 4.0**: 최신 유틸리티 클래스 사용
- **반응형 디자인**: 모바일부터 데스크톱까지
- **접근성**: 포커스 링과 키보드 네비게이션

## 📦 주요 의존성

- **Remix**: 풀스택 웹 프레임워크
- **@jurneyx2/react-lottie-hooks**: DotLottie ScrollTrigger 훅
- **@lottiefiles/dotlottie-react**: DotLottie React 컴포넌트
- **GSAP**: 애니메이션 라이브러리
- **Tailwind CSS**: 유틸리티 CSS 프레임워크

## 🏗️ 프로젝트 구조

```
remix-example/
├── app/
│   ├── components/
│   │   └── LottieScrollExample.tsx  # 메인 컴포넌트
│   ├── routes/
│   │   └── _index.tsx               # 홈 페이지
│   ├── root.tsx                     # 루트 레이아웃
│   └── tailwind.css                 # Tailwind 엔트리포인트
├── public/
│   └── animation.lottie             # 애니메이션 파일
├── package.json
├── tailwind.config.ts               # Tailwind 설정
├── tsconfig.json                    # TypeScript 설정
└── vite.config.ts                   # Vite 설정
```

## 🔧 기술 스택

- **Remix**: 2.15+
- **React**: 19.1
- **TypeScript**: 5.8
- **Vite**: 7.0
- **Tailwind CSS**: 4.1
- **GSAP**: 3.12

## 📱 반응형 특징

- **데스크톱**: 전체 기능과 가로 레이아웃
- **모바일**: 세로 스택 레이아웃과 터치 최적화
- **태블릿**: 적응형 그리드와 간격 조정

## ⚡ 성능 최적화

- **지연 로딩**: 컴포넌트 레벨 청크 분리
- **메모이제이션**: 불필요한 리랜더링 방지
- **디바운싱**: 이벤트 핸들러 최적화
- **SSR**: 초기 로딩 성능 개선

## 🐛 디버깅

개발 모드에서는 다음 디버깅 도구를 사용할 수 있습니다:

- **GSAP 마커**: 스크롤 트리거 위치 시각화
- **상태 로깅**: 애니메이션 상태 콘솔 출력
- **실시간 정보**: UI에서 상태 확인

## 📖 더 알아보기

- [Remix 공식 문서](https://remix.run/docs)
- [@jurneyx2/react-lottie-hooks 문서](../../packages/react-lottie-hooks/README.md)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [GSAP ScrollTrigger 문서](https://greensock.com/scrolltrigger/)

---

**💡 팁**: 이 예제는 프로덕션 환경에서 사용할 수 있도록 최적화되어 있습니다!
