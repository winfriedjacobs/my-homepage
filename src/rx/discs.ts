import { Position, RGBA } from "@/model/basics";
import {
  randomNumberOfSteps,
  randomPositionForDisc,
  randomRadius,
} from "@/model/random";
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
} from "rxjs";

import { createDiscOnCanvas } from "@/model/disc";

// constants
export const MAX_NUMBER_DISCS = 15;

// -- Observables

export const flag$ = new BehaviorSubject(true);

const root$ = flag$.pipe(
  distinctUntilChanged(),
  switchMap(
    (booleanValue) => (booleanValue ? interval(1000) : EMPTY), // stop when flag is false
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
