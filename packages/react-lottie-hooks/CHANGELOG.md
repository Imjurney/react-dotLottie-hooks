# Changelog

이 프로젝트의 모든 중요한 변경사항이 이 파일에 문서화됩니다.

이 프로젝트는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 따릅니다.

# Changelog

이 프로젝트의 모든 중요한 변경사항이 이 파일에 문서화됩니다.

이 프로젝트는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 따릅니다.

## [1.2.7] - 2025-07-02

### 🔒 Security & Performance

- **Source Map 제거**: 프로덕션 빌드에서 소스맵 비활성화로 보안 강화
- **번들 크기 최적화**: 소스맵 제거로 배포 패키지 크기 감소
- **소스 코드 보호**: 원본 소스 코드가 브라우저에서 노출되지 않도록 개선

### 📦 Enhanced ESM Compatibility

- **React Router v7 지원**: Framework mode에서 완벽한 ESM 호환성
- **GSAP ScrollTrigger 최적화**: esbuild alias를 통한 자동 .js 확장자 해결
- **빌드 시점 해결**: 소스 코드 변경 없이 번들링 시 자동 경로 변환

### 🛠️ Technical Improvements

- **tsup 설정 최적화**: ESM 환경에서 GSAP import 이슈 완전 해결
- **하위 호환성**: 기존 CJS/ESM 환경 모두 지원 유지
- **타입 안전성**: TypeScript 타입 정의 문제 해결

## [1.2.6] - 2025-07-02

### 🐛 Bug Fixes

- **ES Module 호환성**: `gsap/dist/ScrollTrigger` → `gsap/ScrollTrigger` import 경로 수정
- **모듈 해결 문제**: ESM 환경에서 GSAP ScrollTrigger 가져오기 오류 해결
- **빌드 최적화**: CommonJS와 ESM 모두에서 안정적인 빌드 지원

### 🌍 Internationalization

- **완전한 다국어 지원**: 모든 디버그 메시지가 한국어/영어 지원
- **일관된 메시지 시스템**: 하드코딩된 영어 메시지를 `DEBUG_LANGUAGE` 시스템으로 통합
- **새로운 메시지 키**:
  - `initialFrameworkDetectionFailed` (프레임워크 감지 실패)
  - `initialGSAPInitFailed` (GSAP 초기화 실패)

### 🔧 Technical Improvements

- **표준화된 오류 처리**: 프레임워크 감지 및 GSAP 초기화 오류 메시지 표준화
- **크로스 플랫폼 호환성**: 다양한 번들러(Vite, Webpack, esbuild 등)에서 안정적 동작
- **개발자 경험 개선**: `debugLanguage` 옵션으로 선호하는 언어로 디버그 메시지 확인 가능

## [1.2.5] - 2025-07-02

### 🔧 Internal Improvements

- **코드 리팩토링**: 내부 로직 최적화 및 안정성 개선

## [1.2.4] - 2025-07-02

### 🐛 Bug Fixes

- **SSR 안전성**: `__remixContext` 접근 시 발생하는 `useContext` 오류 수정
- **프레임워크 감지**: DOM 준비 상태를 확인하여 더 안전한 Remix/React Router 감지
- **초기화 순서**: GSAP 및 프레임워크 감지 초기화 오류 처리 개선
- **메모리 안전성**: try-catch 블록 추가하여 브라우저 호환성 개선

### 🔧 Improvements

- **에러 핸들링**: 프레임워크 감지 실패 시 안전한 기본값 반환
- **DOM 검사**: `document.readyState`를 체크하여 안전한 DOM 접근
- **디버그 로그**: 프레임워크 재감지 상황에 대한 로그 추가

## [1.2.3] - 2025-07-01

### 📚 Documentation Enhancement

- Add GIF.

## [1.2.2] - 2025-07-01

### 📚 Documentation Update

- **README Translation**: Complete translation from Korean to English
- **API Documentation**: Enhanced English documentation with clearer examples
- **Code Comments**: Improved code examples with English comments
- **Professional Presentation**: International-ready documentation

### 🔧 Technical Improvements

- Enhanced code examples for better understanding
- Improved TypeScript documentation
- Clearer API reference section

## [1.2.1] - 2025-07-01

### 📦 패키지 정보 업데이트

- **패키지명 변경**: `@Imjurney/react-lottie-hooks` → `@jurneyx2/react-lottie-hooks`
- **문서 업데이트**: 모든 README 및 예제 파일에서 새로운 패키지명으로 업데이트
- **npm 재배포**: 새로운 패키지명으로 npm 레지스트리에 배포

### 🔧 기술적 개선

- 패키지 메타데이터 일관성 확보
- 모든 예제 프로젝트의 import 구문 업데이트
- 워크스페이스 설정 최적화

## [1.2.0] - 2025-07-01 (최종 버전)

### 🚀 주요 변경사항

#### DotLottie 전용 최적화

- **BREAKING**: `mode` 옵션 제거 - 이제 DotLottie만 지원
- **BREAKING**: `animationData`, `path`, `renderer` 등 lottie-web 전용 옵션 제거
- **BREAKING**: `lottie-web` 의존성 완전 제거
- **간소화**: API가 훨씬 간단하고 직관적으로 변경

#### 새로운 API 구조

```tsx
// Before (v1.1.x)
const hook = useLottieScrollTrigger({
  mode: "dotlottie", // 더이상 필요하지 않음
  animationData: data, // 제거됨
  path: "/animation.json", // 제거됨
  renderer: "svg", // 제거됨
});

// After (v1.2.x) - 최종 버전
const hook = useLottieScrollTrigger({
  // 간단한 ScrollTrigger 옵션만 필요
  start: "top center",
  end: "bottom center",
  debug: true,
});
```

### ✨ 개선사항

- **성능 향상**: 단일 라이브러리 지원으로 번들 크기 대폭 감소
- **유지보수성**: 복잡한 하이브리드 로직 제거로 코드 안정성 향상
- **개발자 경험**: 더 간단하고 직관적인 API
- **타입 안전성**: DotLottie 전용 타입으로 더 정확한 타입 지원

### 🔧 새로운 기능

- **향상된 디버깅**: 더 명확한 에러 메시지와 디버그 정보
- **개선된 SSR 지원**: Next.js, Remix, React Router에서 안정적인 동작
- **최적화된 이벤트 핸들링**: DotLottie 전용으로 최적화된 이벤트 처리
- **4가지 프레임워크 예제**: Next.js, Vite, Remix, React Router 완전 지원

### 📁 지원 프레임워크

- ✅ **Next.js**: App Router 지원, SSR 안전
- ✅ **Vite**: 빠른 개발 환경, HMR 지원
- ✅ **Remix**: 최신 웹 표준, SSR/CSR 호환
- ✅ **React Router**: 파일 기반 라우팅, v7 지원

### 📦 마이그레이션 가이드

1. **lottie-web 의존성 제거**:

   ```bash
   pnpm remove lottie-web @types/lottie-web
   ```

2. **DotLottie/또는 JSON 파일 준비**

3. **코드 업데이트**:

   ```tsx
   // Old (v1.1.x)
   const hook = useLottieScrollTrigger({
     mode: "lottie-web",
     animationData: jsonData,
   });

   // New (v1.2.x) - 최종 버전
   const hook = useLottieScrollTrigger({
     start: "top center",
     end: "bottom center",
   });


   <DotLottieReact
     src="/animation.lottie"
     dotLottieRefCallback={hook.handleDotLottieRef}
     autoplay={false}
     loop={true}
   />;


   or

   <DotLottieReact
     data={/* json파일 */}
     dotLottieRefCallback={hook.handleDotLottieRef}
     autoplay={false}
     loop={true}
   />;
   ```

### 🎯 성능 최적화

- **React State 추적 비활성화**: 기본값으로 성능 우선
- **메모이제이션**: 불필요한 리랜더링 방지
- **디바운싱**: 이벤트 핸들러 최적화
- **코드 분할**: 각 프레임워크별 최적화된 번들링

### 🎨 스타일링

모든 예제에서 **Tailwind CSS**를 사용

### � 문서화

- **완전한 예제**: 4가지 프레임워크별 실제 구현
- **상세한 README**: 각 프레임워크별 설정 가이드
- **타입 안전성**: TypeScript 완전 지원
- **실전 팁**: 프로덕션 환경 최적화 방법

---

## [1.1.x] - 이전 버전 (지원 중단)

### ⚠️ 지원 중단 안내

v1.1.x 이하 버전들은 더 이상 지원되지 않습니다.
**v1.2.0 (최종 버전)**으로 업그레이드하시기 바랍니다.

### 이전 기능들

- 하이브리드 모드 지원 (DotLottie + lottie-web)
- 자동 모드 감지
- 복잡한 API 구조

**더 이상 유지보수되지 않으니 v1.2.0을 사용해주세요.**

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

### 🎯 확장성 개선사항

#### 코드 유지보수성

- **단일 책임 원칙**: 각 모드는 독립적으로 동작
- **의존성 역전**: 인터페이스 기반 설계로 새로운 애니메이션 라이브러리 추가 용이
- **전략 패턴**: 런타임에 최적의 전략 선택

#### 마이그레이션 가이드

**v1.1.x에서 v1.2.x로 마이그레이션**:

1. **의존성 변경**:

   ```bash
   # lottie-web 제거
   npm uninstall lottie-web @types/lottie-web

   # DotLottie만 사용
   npm install @lottiefiles/dotlottie-react
   ```

2. **코드 변경**:

   ```tsx
   // Before
   const hook = useLottieScrollTrigger({
     mode: "dotlottie", // 제거
     // ... 기타 lottie-web 옵션들 제거
   });

   // After
   const hook = useLottieScrollTrigger({
     // DotLottie 전용 옵션만 사용
     start: "top center",
     end: "bottom center",
   });
   ```

3. **컴포넌트 변경**:

   ```tsx
   // Before: mode별 분기 처리
   {
     hook.mode === "dotlottie" && (
       <DotLottieReact dotLottieRefCallback={hook.handleDotLottieRef} />
     );
   }

   // After: 간단한 사용
   <DotLottieReact dotLottieRefCallback={hook.handleDotLottieRef} />;
   ```
