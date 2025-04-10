// hooks/useBlockBack.ts
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Custom hook that prevents the user from navigating backward using
 * the browser's back button. It forces navigation to remain within
 * the app's control, similar to native mobile apps.
 *
 * Usage: Call this hook once in a top-level component like App or Layout.
 */
const useBlockBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, "", location.pathname);
    const handlePopState = () => {
      navigate(location.pathname, { replace: true }); // fuerza quedarse
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate, location]);

  return null;
};

export default useBlockBack;
