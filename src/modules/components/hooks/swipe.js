import { useEffect } from "react";

/**
 * Custom hook to detect swipe gestures and trigger a close action.
 *
 * @param {Object} options - Configuration options.
 * @param {boolean} options.isOpen - Whether the component is open.
 * @param {Function} options.onClose - Function to call when a swipe is detected.
 */
const useSwipeClose = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    let startX = 0;

    const handleTouchStart = (event) => {
      startX = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
      const endX = event.changedTouches[0].clientX;
      const difference = endX - startX;

      // Detect swipes: right-to-left (-50) OR left-to-right (+50)
      if (Math.abs(difference) > 50) {
        onClose();
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, onClose]);
};

export default useSwipeClose;
