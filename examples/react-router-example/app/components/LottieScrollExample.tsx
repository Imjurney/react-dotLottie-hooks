import { useLottieScrollTrigger } from "@jurneyx2/react-lottie-hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export function LottieScrollExample() {
  const [externalPlayState, setExternalPlayState] = useState(false);
  const [debugInfo, setDebugInfo] = useState(""); // Debug information
  const [isManualControl, setIsManualControl] = useState(false); // Manual control mode

  // Performance optimized hook usage
  const {
    triggerRef,
    handleDotLottieRef,
    play,
    pause,
    getIsPlaying, // Add ref-based getter
    isLoaded,
    isClient,
    isDOMReady,
    dotLottie, // Direct access to DotLottie instance
  } = useLottieScrollTrigger({
    start: "top center",
    end: "bottom center",
    debug: false, // Generally false in React Router
    debugLanguage: "ko",
    markers: false, // Generally false in React Router

    // Performance optimization: State synchronization via callbacks
    onPlayStateChange: (isPlaying) => {
      console.log("Play state changed:", isPlaying);
      setExternalPlayState(isPlaying);
      setDebugInfo(
        `onPlayStateChange: ${
          isPlaying ? "Playing" : "Paused"
        } (${new Date().toLocaleTimeString()})`
      );
    },

    // Scroll events (only works when not in manual control mode)
    onEnter: (dotLottie) => {
      console.log("Entered animation area!");
      if (!isManualControl) {
        dotLottie.play();
      }
      // setExternalPlayState(true) automatically called by onPlayStateChange callback
    },
    onLeave: (dotLottie) => {
      console.log("Left animation area!");
      if (!isManualControl) {
        dotLottie.pause();
      }
      // setExternalPlayState(false) automatically called by onPlayStateChange callback
    },
  });

  const handlePlayToggle = () => {
    // Activate manual control mode
    setIsManualControl(true);

    // Check current state accurately via ref (no re-rendering)
    const currentPlayState = getIsPlaying();
    const dotLottieNativeState = dotLottie?.isPlaying || false;

    console.log("🔍 State check:", {
      refState: currentPlayState,
      dotLottieNative: dotLottieNativeState,
      externalState: externalPlayState,
      isLoaded: isLoaded,
      isManualControl: true,
    });

    if (currentPlayState) {
      console.log("⏸️ Execute pause command (manual control)");
      pause();
    } else {
      console.log("▶️ Execute play command (manual control)");
      play();
    }

    // Restore to auto control mode after 3 seconds (optional)
    setTimeout(() => {
      setIsManualControl(false);
      console.log("🔄 Restored to auto control mode");
    }, 3000);

    // State update is automatically handled by onPlayStateChange callback
  };

  // Function to restore to auto control mode
  const handleAutoMode = () => {
    setIsManualControl(false);
    console.log("🔄 Manually restored to auto control mode");
    setDebugInfo(
      `Restored to auto control mode (${new Date().toLocaleTimeString()})`
    );
  };

  // Function to check DotLottie state directly
  const handleDirectCheck = () => {
    if (dotLottie) {
      const nativeState = dotLottie.isPlaying;
      const refState = getIsPlaying();
      alert(
        `Direct DotLottie check:\n- Native: ${nativeState}\n- Ref: ${refState}\n- External: ${externalPlayState}`
      );
    }
  };

  // SSR safety check
  if (!isClient || !isDOMReady) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header section */}
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          React Lottie Hooks v1.2
        </h1>
        <p className="text-xl md:text-base text-gray-600 text-center mb-8 max-w-3xl md:px-4">
          Performance optimized DotLottie-only scroll-based animation hook for
          React Router
        </p>
        <div className="mt-8 text-center text-gray-500">
          ⬇️ Scroll down to see the animation
        </div>
      </div>

      {/* Animation section */}
      <div
        ref={triggerRef}
        className="h-screen flex items-center justify-center bg-white"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Performance Optimized DotLottie Animation
          </h2>

          <div className="w-80 h-80 md:w-64 md:h-64 mx-auto mb-8 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <DotLottieReact
              src="./demo.lottie"
              dotLottieRefCallback={handleDotLottieRef}
              autoplay={false}
              loop={true}
              className="w-full h-full"
            />
          </div>

          {/* Control buttons */}
          <div className="flex md:flex-col justify-center gap-4 md:gap-2 md:items-center mb-8">
            <button
              onClick={handlePlayToggle}
              className="px-4 py-2 md:w-48 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={!isLoaded}
            >
              {externalPlayState ? "⏸️ Pause" : "▶️ Play"}
            </button>

            <button
              onClick={handleAutoMode}
              className={`px-4 py-2 md:w-48 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 font-medium ${
                isManualControl
                  ? "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isLoaded || !isManualControl}
            >
              🔄 Auto Mode
            </button>

            <button
              onClick={handleDirectCheck}
              className="px-4 py-2 md:w-48 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={!isLoaded}
            >
              🔍 Check State
            </button>
          </div>

          {/* Status information */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 max-w-md md:max-w-xs mx-auto mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Load Status</div>
              <div
                className={`text-lg font-medium ${
                  isLoaded ? "text-green-600" : "text-orange-600"
                }`}
              >
                {isLoaded ? "✅ Loaded" : "⏳ Loading..."}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Play Status</div>
              <div
                className={`text-lg font-medium ${
                  externalPlayState ? "text-green-600" : "text-gray-600"
                }`}
              >
                {externalPlayState ? "▶️ Playing" : "⏸️ Paused"}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Current Frame</div>
              <div className="text-lg font-medium text-blue-600">
                🎬 Optimized
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Control Mode</div>
              <div
                className={`text-lg font-medium ${
                  isManualControl ? "text-orange-600" : "text-blue-600"
                }`}
              >
                {isManualControl ? "🔧 Manual Control" : "🤖 Auto Control"}
              </div>
            </div>
          </div>

          {/* Debug information */}
          {debugInfo && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <div className="text-sm text-yellow-800 font-medium mb-1">
                Debug Info
              </div>
              <div className="text-sm text-yellow-700">{debugInfo}</div>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
            <p className="mb-2">
              ⚡ <strong>Performance Optimization:</strong> React state tracking
              disabled by default
            </p>
            <p className="mb-2">
              📊 <strong>Scroll-based:</strong> Automatic animation control
            </p>
            <p className="mb-2">
              🎯 <strong>Manual State Management:</strong> External state update
              only when needed
            </p>
            <p className="text-orange-600">
              🔧 <strong>Manual/Auto Control:</strong> 3-second manual mode on
              button click
            </p>
          </div>
        </div>
      </div>

      {/* Additional content */}
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Scroll-based Control
          </h2>
          <p className="text-lg text-gray-600">
            Animation is automatically controlled based on scroll position.
          </p>
          <p className="text-md text-gray-500 mt-4">
            React Router + DotLottie + GSAP ScrollTrigger Implementation
          </p>
        </div>
      </div>
    </div>
  );
}
