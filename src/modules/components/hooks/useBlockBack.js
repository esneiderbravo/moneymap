// hooks/useBlockBack.ts
import { useEffect } from "react";

/**
 * Custom hook that prevents the user from navigating backward using
 * the browser's back button. It forces navigation to remain within
 * the app's control, similar to native mobile apps.
 *
 * Usage: Call this hook once in a top-level component like App or Layout.
 */
const useBlockBack = () => {
  useEffect(() => {
    // Push a new history entry to trap the user in the current view
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // When the user attempts to go back, push them back to the same page
      window.history.pushState(null, "", window.location.href);
    };

    // Listen to the popstate event, which is triggered by back/forward navigation
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};

export default useBlockBack;
