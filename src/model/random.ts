import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/constants/canvas";
import { MAX_RADIUS, type Position } from "@/model/basics";

export function randomRadius(): number {
  return Math.random() * MAX_RADIUS;
}

export function randomPositionForDisc(radius: number): Position {
  // must be shown on the canvas without cropping, which means we consider the radius on all sides
  return {
    x: Math.random() * (CANVAS_HEIGHT - 2 * radius) + radius,
    y: Math.random() * (CANVAS_WIDTH - 2 * radius) + radius,
  };
}

export function randomNumberOfSteps(): number {
  return Math.floor(Math.random() * 100) + 1 + 50;
}
