import { useLottieScrollTrigger } from '@Imjurney/react-lottie-hooks';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './LottieScrollExample.css';

export default function LottieScrollExample() {
  const { triggerRef, handleDotLottieRef, isLottieLoaded, isPlaying } = useLottieScrollTrigger({
    start: 'top center',
    end: 'bottom 20%',
    debug: true,
    debugLanguage: 'en', // 영어 버전
    pauseOnLoad: true,
  });

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">
          Vite + React Lottie Hooks Example
        </h1>
        
        <div className="sections">
          {/* 설명 섹션 */}
          <div className="intro">
            <p className="description">
              Scroll down to see the Lottie animation play automatically.
            </p>
            <div className="status">
              <span className={`badge ${isLottieLoaded ? 'loaded' : 'loading'}`}>
                {isLottieLoaded ? '✅ Loaded' : '⏳ Loading'}
              </span>
              <span className={`badge ${isPlaying ? 'playing' : 'paused'}`}>
                {isPlaying ? '▶️ Playing' : '⏸️ Paused'}
              </span>
            </div>
          </div>

          {/* 스페이서 */}
          <div className="spacer"></div>

          {/* Lottie 애니메이션 섹션 */}
          <div ref={triggerRef} className="animation-section">
            <h2 className="section-title">
              Scroll Trigger Animation
            </h2>
            <div className="animation-container">
              <div className="animation-wrapper">
                <DotLottieReact
                  src="https://lottie.host/4db68bbd-31f6-4cd8-b635-17e6a5c5a7b7/hY2dzw8c69.lottie"
                  loop
                  autoplay={false}
                  dotLottieRefCallback={handleDotLottieRef}
                  className="lottie-animation"
                />
              </div>
            </div>
            <p className="animation-note">
              This animation is automatically controlled by scroll position.
            </p>
          </div>

          {/* 더 많은 콘텐츠 */}
          <div className="more-content">
            <div className="content-center">
              <h3 className="content-title">
                More Content
              </h3>
              <p className="content-description">
                Continue scrolling to see the animation behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
