export const MAX_ALPHA = 1; // was 255 in Java
export const MAX_RADIUS = 10; // todo: wie ist es in Processing?

export type RGBA = {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
  alpha?: number; // 0 - MAX_ALPHA (optional alpha channel)
};

export type Position = {
  x: number;
  y: number;
};
