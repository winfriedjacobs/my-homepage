import { from, tap, of, zip, interval } from "rxjs";
import { Disc } from "./disc";
import { Position } from "./basics";

type Step = {
  sequentialNumber: number;
  position: Position;
  opacity: number; // 0 to 255
};

function* stepPositions(
  startPosition: Position,
  endPosition: Position,
  numberOfSteps: number,
) {
  const xStep = (endPosition.x - startPosition.x) / numberOfSteps;
  const yStep = (endPosition.y - startPosition.y) / numberOfSteps;

  for (
    let i = 0, currentPosition = startPosition;
    i < numberOfSteps;
    i++,
      currentPosition = {
        x: currentPosition.x + xStep,
        y: currentPosition.y + yStep,
      }
  ) {
    yield {
      sequentialNumber: i,
      position: currentPosition,
      opacity: 255,
    };
  }
}

function* steps(disc: Disc): Generator<Step> {
  for (let currentPosition in stepPositions(
    disc.startPosition,
    disc.endPosition,
    disc.numberOfSteps
  )) {
    yield {
      sequentialNumber: i,
      position: currentPosition,
      opacity: 255,
    };
  }
}

// tests

function* generate() {
  for (let i = 0; i < 100; i++) {
    yield "wert" + i;
  }
}

if (false) {
  // zip(from(generate()), interval(1000)).pipe(
  zip(generate(), interval(1000))
    .pipe(tap((val) => console.log("of_xxx", val)))
    .subscribe();
}

if (true) {
  const startPosition = {
    x: 400,
    y: 200,
  };
  const endPosition = {
    x: 200,
    y: 300,
  }
  const numberOfSteps = 100;

  from(stepPositions(startPosition, endPosition, numberOfSteps)).pipe(
    tap((val) => console.log("stepPos:", val))
  ).subscribe()
}

if (false) {
  const startPosition = {
    x: 400,
    y: 200,
  };
  const endPosition = {
    x: 200,
    y: 300,
  }
  const numberOfSteps = 20;

  from(stepPositions(startPosition, endPosition, numberOfSteps)).pipe(
    tap((val) => console.log("stepPos:", val))
  ).subscribe()
}


console.log("Ende");
