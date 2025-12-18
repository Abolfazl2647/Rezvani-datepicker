export const KEY_CODES = {
  ESCAPE: "Escape",
  ENTER: "Enter",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  TAB: "Tab",
  SPACE: " ",
} as const;

export function isEscapeKey(event: KeyboardEvent): boolean {
  return event.key === KEY_CODES.ESCAPE;
}

export function isEnterKey(event: KeyboardEvent): boolean {
  return event.key === KEY_CODES.ENTER;
}

export function isArrowKey(event: KeyboardEvent): boolean {
  return [
    KEY_CODES.ARROW_UP,
    KEY_CODES.ARROW_DOWN,
    KEY_CODES.ARROW_LEFT,
    KEY_CODES.ARROW_RIGHT,
  ].includes(event.key as any);
}
