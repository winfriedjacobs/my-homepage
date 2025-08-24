import { from } from "@reactivex/rxjs/src";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/canvas.js";

const randomPosition = (radius) => ({
  height: Math.random() * CANVAS_HEIGHT - radius,
  width: Math.random() * CANVAS_WIDTH - radius,
});

class Disc {
  constructor(startPosition, endPosition) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  static createOnCanvas = () => {
    return {
      start_position: randomPosition(),
      end_position: randomPosition(),
    };
  };
}

export const discs$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
