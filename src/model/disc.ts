import { Position, RGBA } from "@/model/basics";
import {
  randomNumberOfSteps,
  randomPositionForDisc,
  randomRadius,
} from "@/model/random";
import { from, map, merge, scan, share, startWith, Subject } from "rxjs";

export type Disc = {
  color: RGBA;
  radius: number;
  startPosition: Position;
  endPosition: Position;
  numberOfSteps: number;
};

function createDiscOnCanvas(): Disc {
  const radius: number = randomRadius();
  const color: RGBA = {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
  };
  return {
    color,
    radius,
    startPosition: randomPositionForDisc(radius),
    endPosition: randomPositionForDisc(radius),
    numberOfSteps: randomNumberOfSteps(),
  };
}

function* createDiscsOnCanvas(): Generator<Disc> {
  while (true) {
    yield createDiscOnCanvas();
  }
}

export const startedDiscs$ = new Subject(); // add started discs here
export const finishedDiscs$ = new Subject(); // add started discs here
export const numberOfActiveDiscs$ = merge(
  startedDiscs$.pipe(
    map((obj: any) => 1), // add 1
  ),
  finishedDiscs$.pipe(
    map((obj: any) => -1), // subtract 1
  ),
).pipe(
  scan((total: number, current: number) => total + current, 0),
  startWith(0),
);

// export const discs$: Observable<Disc> = from<ObservableInput<Disc>>(createDiscsOnCanvas());
export const discs$ = from(createDiscsOnCanvas()).pipe(share());
