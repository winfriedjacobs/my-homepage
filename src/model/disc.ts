import { from } from "@reactivex/rxjs/src";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/constants/canvas";


const randomPosition = (radius) => ({
  height: Math.random() * CANVAS_HEIGHT - radius,
  width: Math.random() * CANVAS_WIDTH - radius,
});


type Position = {
    x: number;
    y: number;
}

type Step = {
    position: Position;
    opacity: number;  // 0 to 255
}

type Disc = {
  startPosition: Position;
  endPosition: Position;
  numberOfSteps: number;

  constructor({startPosition: Position, endPosition: Position, numberOfSteps: number}) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.numberOfSteps = numberOfSteps;
  }

  steps = function*() {
      const xStep = (this.endPosition.x - this.startPosition.x) / this.numberOfSteps;
      const yStep = (this.endPosition.y - this.startPosition.y) / this.numberOfSteps;

      yield this.startPosition;
      yield this.endPosition;
  }

  static createOnCanvas = () => {
    return new Disc({
      start_position: randomPosition(),
      end_position: randomPosition(),
      numberOfSteps: 100,
    });
  };
}

export const discs$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
