import { from, tap, of, zip, interval } from "rxjs";
import { Disc } from "./disc";

type Step = {
  sequentialNumber: number;
  position: Position;
  opacity: number; // 0 to 255
};

function* steps(disc: Disc): Generator<Step> {
  const xStep =
    (disc.endPosition.x - disc.startPosition.x) / disc.numberOfSteps;
  const yStep =
    (disc.endPosition.y - disc.startPosition.y) / disc.numberOfSteps;

  for (
    let i = 0, currentPosition = disc.startPosition;
    i < disc.numberOfSteps;
    i++,
      currentPosition = {
        x: currentPosition.x + xStep,
        y: currentPosition.y + yStep,
      }
  ) {
    yield {
      sequentialNumber: i,
      position: {
        x: this.startPosition.x + i * xStep,
        y: this.startPosition.y + i * yStep,
      },
      opacity: 255,
    };
  }

  yield this.startPosition;
  yield this.endPosition;
}

// tests

function* generate() {
  for (let i = 0; i < 100; i++) {
    yield "wert" + i;
  }
}

// zip(from(generate()), interval(1000)).pipe(
zip(generate(), interval(1000))
  .pipe(tap((val) => console.log("of_xxx", val)))
  .subscribe();

console.log("Ende");
