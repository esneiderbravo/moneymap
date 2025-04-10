import { useEffect } from "react";

/**
 * Custom hook to handle swipe gestures for closing a component.
 *
 * Triggers the `onClose` callback when the user swipes horizontally
 * either from left to right or from right to left with a significant distance.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {boolean} params.isOpen - Indicates whether the component is currently open.
 * @param {Function} params.onClose - Callback function to execute when a swipe is detected.
 */
const useSwipeClose = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    let startX = 0;

    /**
     * Records the starting X position of the touch gesture.
     * @param {TouchEvent} event
     */
    const handleTouchStart = (event) => {
      startX = event.touches[0].clientX;
    };

    /**
     * Checks the swipe distance and triggers onClose if threshold is exceeded.
     * @param {TouchEvent} event
     */
    const handleTouchEnd = (event) => {
      const endX = event.changedTouches[0].clientX;
      const difference = endX - startX;

      // Trigger onClose if swipe distance is greater than 50px in either direction
      if (Math.abs(difference) > 50) {
        onClose(event);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    // Cleanup event listeners on unmount or when isOpen changes
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, onClose]);
};

export default useSwipeClose;
