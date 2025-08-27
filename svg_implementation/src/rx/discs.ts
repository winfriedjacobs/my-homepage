import {
  BehaviorSubject,
  distinctUntilChanged,
  EMPTY,
  interval,
  map,
  merge,
  scan,
  share,
  startWith,
  Subject,
  switchMap,
  tap,
  zip,
} from "rxjs";

import { Position, RGBA } from "@/model/basics";
import {
  randomNumberOfSteps,
  randomPositionForDisc,
  randomRadius,
} from "@/model/random";

import { createDiscOnCanvas, Disc } from "@/model/disc";
import { steps } from "@/model/step";

// constants
export const INTERVAL_OF_DISC_CREATION = 12000; // milliseconds
export const MAX_NUMBER_DISCS = 15;

// --

export function* stepsFromDisc(disc: Disc) {
  yield* steps(disc.startPosition, disc.endPosition, disc.numberOfSteps);
}

export const stepsFromDiscDelayed$ = (intervalDelay: number, disc: Disc) =>
  zip(
    interval(intervalDelay),
    stepsFromDisc(disc), // here the same as: from(stepsFromDisc(disc))
  ).pipe(map(([_, disc]) => disc));

// -- Observables

export const flag$ = new BehaviorSubject(true);

const root$ = flag$.pipe(
  distinctUntilChanged(),
  switchMap(
    (booleanValue) =>
      booleanValue ? interval(INTERVAL_OF_DISC_CREATION) : EMPTY, // stop when flag is false
  ),
);

// Intervals are scheduled
// with async scheduler by default...
// .pipe(
//   observeOn(animationFrameScheduler),
//   ...but we will observe on animationFrame
//   scheduler to ensure smooth animation.
//   skipWhile(throttle$)
// );

export const discs$ = root$.pipe(
  map((num) => createDiscOnCanvas(num + 1)),
  share(),
);

export const finishedDiscs$ = new Subject(); // add started discs here
export const numberOfActiveDiscs$ = merge(
  discs$.pipe(
    map(() => 1), // add 1 in scan() below
    tap(() => console.log("xxx added")),
  ),
  finishedDiscs$.pipe(
    map(() => -1), // subtract 1 in scan() below
    tap(() => console.log("xxx subtracted")),
  ),
).pipe(
  scan((total: number, current: number) => total + current, 0),
  startWith(0),
  tap((n) => console.log("xxx count current:", n)),
);

numberOfActiveDiscs$
  .pipe(
    map((count) => count < MAX_NUMBER_DISCS),
    // send a false to flag when count >= MAX_NUMBER_DISCS
    // which means: suspend creation of discs when count >= MAX_NUMBER_DISCS
  )
  .subscribe(flag$);
