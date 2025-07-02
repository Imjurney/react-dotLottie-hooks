import DEBUG_LANGUAGE from "../language";

export interface FrameworkDetectionResult {
  isNextJS: boolean;
  isRemix: boolean;
  isSSRFramework: boolean;
}

/**
 * Detects the current SSR framework being used
 * @returns Framework detection result with boolean flags
 */
export const detectSSRFramework = (): FrameworkDetectionResult => {
  const isClient = typeof window !== "undefined";

  if (!isClient) {
    return { isNextJS: false, isRemix: false, isSSRFramework: false };
  }

  try {
    // Detect Next.js
    const isNextJS = !!(window as any).__NEXT_DATA__;

    // Detect Remix (React Router v7 is based on Remix)
    let isRemix = false;

    // Only check after DOM is ready to avoid potential issues
    if (document.readyState !== "loading") {
      isRemix = !!(
        (window as any).__remixContext ||
        (window as any).__remixRouteModules ||
        (window as any).__remixManifest ||
        document.querySelector("script[data-remix]") ||
        document.querySelector("[data-remix-root]")
      );
    }

    return {
      isNextJS,
      isRemix,
      isSSRFramework: isNextJS || isRemix,
    };
  } catch (error) {
    const tempMsg = DEBUG_LANGUAGE["ko"]; // 임시로 기본 언어 사용
    console.warn(tempMsg.initialFrameworkDetectionFailed, error);
    return { isNextJS: false, isRemix: false, isSSRFramework: false };
  }
};

/**
 * Checks if the current environment is client-side
 * @returns true if running in browser, false if server-side
 */
export const isClient = typeof window !== "undefined";
