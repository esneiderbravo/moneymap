import { useEffect, useRef } from "react";

/**
 * Custom hook that detects swipe gestures in both directions (left-to-right and right-to-left)
 * and triggers a close action when the swipe exceeds a threshold.
 *
 * @param {Object} options - Hook options
 * @param {boolean} options.isOpen - Determines if the event listeners should be active
 * @param {Function} options.onClose - Callback function to execute when a swipe is detected
 * @param {number} [options.threshold=50] - Minimum swipe distance (in pixels) to trigger onClose
 */
const useSwipeClose = ({ isOpen, onClose, threshold = 50 }) => {
  const startXRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return; // Only attach listeners when the component is open

    /**
     * Stores the starting X-coordinate of the touch event.
     * @param {TouchEvent} event - The touchstart event
     */
    const handleTouchStart = (event) => {
      startXRef.current = event.touches[0].clientX;
    };

    /**
     * Detects swipe gestures in either direction and triggers onClose.
     * @param {TouchEvent} event - The touchend event
     */
    const handleTouchEnd = (event) => {
      const endX = event.changedTouches[0].clientX;
      const difference = endX - startXRef.current;

      if (Math.abs(difference) > threshold) {
        onClose(); // Close on swipe regardless of direction
      }
    };

    // Add event listeners
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    // Cleanup function to remove event listeners when `isOpen` changes or component unmounts
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, onClose, threshold]);

  return null; // Hook does not return anything, only manages events
};

export default useSwipeClose;
