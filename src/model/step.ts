import { from, tap, of, zip, interval } from "rxjs";
import { createDiscOnCanvas, Disc } from "../model/disc";
import { MAX_ALPHA, Position } from "./basics";

const THRESHOLD = 25; // fade-in/fade-out

type Step = {
  sequentialNumber: number;
  position: Position;
  opacity: number; // 0 to 255
};

function* basicSteps(disc: Disc): Generator<Step> {
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
      position: currentPosition,
      opacity: MAX_ALPHA,
    };
  }
}

function* steps(disc: Disc) {
  const upper_threshold = disc.numberOfSteps - THRESHOLD;
  for (const step of basicSteps(disc)) {
    const newStep = { ...step };
    if (newStep.sequentialNumber < THRESHOLD) {
      // const diff = THRESHOLD - newStep.sequentialNumber ;
      // alpha =  (THRESHOLD - diff)  / THRESHOLD;
      // shorter:
      const alpha = newStep.sequentialNumber / THRESHOLD;
      newStep.opacity *= alpha;
    } else if (newStep.sequentialNumber >= upper_threshold) {
      // const diff = newStep.sequentialNumber - upper_threshold;
      //            = newStep.sequentialNumber - disc.numberOfSteps + THRESHOLD;
      // alpha =  (THRESHOLD - diff)  / THRESHOLD;
      // shorter:
      const alpha = (disc.numberOfSteps - newStep.sequentialNumber) / THRESHOLD;
      newStep.opacity *= alpha;
    }
    yield newStep;
  }
}

// tests

if (false) {
  function* generate() {
    for (let i = 0; i < 100; i++) {
      yield "wert" + i;
    }
  }

  // zip(from(generate()), interval(1000)).pipe(
  zip(generate(), interval(1000))
    .pipe(tap((val) => console.log("of_xxx", val)))
    .subscribe();
}

if (true) {
  const disc = createDiscOnCanvas(23);

  from(steps(disc))
    .pipe(tap((step) => {
      console.log("step_seqNum:", step.sequentialNumber);
      console.log("step_opacity:", step.opacity);
    }))
    .subscribe();

  console.log("numberOfSteps", disc.numberOfSteps);
}

console.log("Ende");
