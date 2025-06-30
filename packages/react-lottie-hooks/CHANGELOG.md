# Changelog

이 프로젝트의 모든 중요한 변경사항이 이 파일에 문서화됩니다.

이 프로젝트는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 따릅니다.

## [3.0.0] - 2024-12-30

### 🚀 주요 변경사항 (Breaking Changes)

#### DotLottie 전용 최적화

- **BREAKING**: `mode` 옵션 제거 - 이제 DotLottie만 지원
- **BREAKING**: `animationData`, `path`, `renderer` 등 lottie-web 전용 옵션 제거
- **BREAKING**: `lottie-web` 의존성 완전 제거
- **간소화**: API가 훨씬 간단하고 직관적으로 변경

#### 새로운 API 구조

```tsx
// Before (v2.x)
const hook = useLottieScrollTrigger({
  mode: "dotlottie", // 더이상 필요하지 않음
  animationData: data, // 제거됨
  path: "/animation.json", // 제거됨
  renderer: "svg", // 제거됨
});

// After (v3.x)
const hook = useLottieScrollTrigger({
  // 간단한 ScrollTrigger 옵션만 필요
  start: "top center",
  end: "bottom center",
  debug: true,
});
```

#### 마이그레이션 가이드

1. **lottie-web 의존성 제거**:

   ```bash
   pnpm remove lottie-web
   ```

2. **DotLottie 파일 준비**:

   - JSON 파일을 `.lottie` 파일로 변환
   - 또는 DotLottie 호환 URL 사용

3. **코드 업데이트**:

   ```tsx
   // Old
   const hook = useLottieScrollTrigger({
     mode: "lottie-web",
     animationData: jsonData,
   });

   // New
   const hook = useLottieScrollTrigger({
     start: "top center",
     end: "bottom center",
   });

   // DotLottieReact 컴포넌트 사용
   <DotLottieReact
     src="/animation.lottie"
     dotLottieRefCallback={hook.handleDotLottieRef}
     autoplay={false}
     loop={true}
   />;
   ```

### ✨ 개선사항

- **성능 향상**: 단일 라이브러리 지원으로 번들 크기 대폭 감소
- **유지보수성**: 복잡한 하이브리드 로직 제거로 코드 안정성 향상
- **개발자 경험**: 더 간단하고 직관적인 API
- **타입 안전성**: DotLottie 전용 타입으로 더 정확한 타입 지원

### 🔧 새로운 기능

- **향상된 디버깅**: 더 명확한 에러 메시지와 디버그 정보
- **개선된 SSR 지원**: Next.js, Nuxt.js에서 더 안정적인 동작
- **최적화된 이벤트 핸들링**: DotLottie 전용으로 최적화된 이벤트 처리

---

## [2.0.0] - 2024-12-XX (Deprecated)

### ⚠️ 지원 중단 안내

v2.x는 더 이상 지원되지 않습니다. v3.x로 업그레이드하시기 바랍니다.

### 이전 기능들 (v2.x)

- 하이브리드 모드 지원 (DotLottie + lottie-web)
- 자동 모드 감지
- 통합 API 등

자세한 내용은 Git 히스토리를 참조하세요.

```tsx
// animationData나 path가 있으면 자동으로 lottie-web 선택
const hook = useLottieScrollTrigger({
  path: "/animation.json", // 이 옵션 때문에 자동으로 lottie-web 모드
});

// 위 옵션들이 없으면 자동으로 DotLottie 선택 (권장)
const hook = useLottieScrollTrigger({
  // mode 생략 시 자동으로 DotLottie 모드 선택
});
```

### 🔧 Breaking Changes

#### v1.x에서 v2.x 마이그레이션

**1. 모드별 콜백 → 통합 콜백**

```tsx
// v1.x (모드별 콜백)
const hook = useLottieScrollTrigger({
  onDotLottieEnter: (dotLottie) => {
    /* ... */
  },
  onLottieWebEnter: (animation) => {
    /* ... */
  },
});

// v2.x (통합 콜백)
const hook = useLottieScrollTrigger({
  onEnter: (instance) => {
    /* DotLottie 또는 AnimationItem */
  },
});
```

**2. 자동 의존성 관리**

```tsx
// v1.x (모든 의존성 필수)
npm install @lottiefiles/dotlottie-react lottie-web

// v2.x (선택적 설치)
npm install @lottiefiles/dotlottie-react  # DotLottie 사용 시만
npm install lottie-web                    # lottie-web 사용 시만
```

### 🎯 확장성 개선사항

#### 코드 유지보수성

- **단일 책임 원칙**: 각 모드는 독립적으로 동작
- **의존성 역전**: 인터페이스 기반 설계로 새로운 애니메이션 라이브러리 추가 용이
- **전략 패턴**: 런타임에 최적의 전략 선택

#### 성능 최적화

- **지연 로딩**: 사용하는 모드만 로드
- **트리 셰이킹**: 번들러에서 사용하지 않는 코드 자동 제거
- **메모리 최적화**: 불필요한 인스턴스 생성 방지

#### 개발자 경험

- **IntelliSense 향상**: 모든 모드에서 완전한 타입 추론
- **디버깅 개선**: 다국어 디버그 메시지 (한국어/영어)
- **에러 처리**: 더 명확한 에러 메시지와 해결 방법 제시

### 📚 문서화 개선

#### 새로운 가이드

- **마이그레이션 가이드**: v1.x → v2.x 단계별 업그레이드
- **확장성 가이드**: 새로운 애니메이션 라이브러리 추가 방법
- **성능 최적화 가이드**: 프로덕션 환경 최적화 팁
- **트러블슈팅**: 일반적인 문제와 해결 방법

#### 실전 예제

- **Next.js SSR 안전 컴포넌트**: Hydration 에러 방지
- **반응형 다중 애니메이션**: 디바이스별 최적화
- **동적 모드 전환**: 런타임 모드 변경

### 🔮 향후 계획

#### v2.1 (단기)

- **성능 모니터링**: 애니메이션 성능 메트릭 수집
- **접근성 향상**: `prefers-reduced-motion` 지원
- **추가 이벤트**: `onProgress`, `onComplete` 등

#### v2.2 (중기)

- **다중 애니메이션**: 하나의 훅으로 여러 애니메이션 제어
- **애니메이션 체인**: 순차적 재생 지원
- **뷰포트 최적화**: Intersection Observer 기반 지연 로딩

#### v3.x (장기)

- **플러그인 시스템**: 커스텀 렌더러 지원 (Rive, Three.js 등)
- **AI 기반 최적화**: 사용 패턴 분석 후 자동 최적화
- **추가 프레임워크**: Svelte, Vue 지원 검토

### 🤝 기여자

이 버전은 다음과 같은 철학으로 개발되었습니다:

- **확장성 우선**: 새로운 요구사항을 쉽게 수용
- **호환성 보장**: 기존 코드와의 호환성 최대한 유지
- **개발자 경험**: 직관적이고 사용하기 쉬운 API
- **성능 최적화**: 프로덕션 환경에서의 안정성
