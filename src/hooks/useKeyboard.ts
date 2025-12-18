import { useEffect, useCallback } from "react";

export function useKeyboard(
  onEscape?: () => void,
  onEnter?: () => void,
  enabled: boolean = true
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      if (e.key === "Escape") {
        onEscape?.();
      }
      if (e.key === "Enter") {
        onEnter?.();
      }
    },
    [enabled, onEscape, onEnter]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
    return undefined;
  }, [enabled, handleKeyDown]);
}
