import { MAX_ALPHA, Position } from "./basics";

const THRESHOLD = 25; // fade-in/fade-out

export type Step = {
  sequentialNumber: number;
  position: Position;
  opacity: number; // 0 to 255
};

function* basicSteps(
  startPosition: Position,
  endPosition: Position,
  numberOfSteps: number,
): Generator<Step> {
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
      opacity: MAX_ALPHA,
    };
  }
}

export function* steps(
  startPosition: Position,
  endPosition: Position,
  numberOfSteps: number,
) {
  const upper_threshold = numberOfSteps - THRESHOLD;
  for (const step of basicSteps(startPosition, endPosition, numberOfSteps)) {
    const newStep = { ...step };
    if (newStep.sequentialNumber < THRESHOLD) {
      // const diff = THRESHOLD - newStep.sequentialNumber ;
      // alpha =  (THRESHOLD - diff)  / THRESHOLD;
      // shorter:
      const alpha = newStep.sequentialNumber / THRESHOLD;
      newStep.opacity *= alpha;
    } else if (newStep.sequentialNumber >= upper_threshold) {
      // const diff = newStep.sequentialNumber - upper_threshold;
      //            = newStep.sequentialNumber - numberOfSteps + THRESHOLD;
      // alpha =  (THRESHOLD - diff)  / THRESHOLD;
      // shorter:
      const alpha = (numberOfSteps - newStep.sequentialNumber) / THRESHOLD;
      newStep.opacity *= alpha;
    }
    yield newStep;
  }
}
