import { Position, RGBA } from "@/model/basics";
import {
  randomNumberOfSteps,
  randomPositionForDisc,
  randomRadius,
} from "@/model/random";
import {
  asyncScheduler,
  from,
  interval,
  map,
  merge,
  observeOn,
  of,
  scan,
  share,
  startWith,
  Subject,
  take,
  tap,
  zip,
} from "rxjs";

export type Disc = {
  color: RGBA;
  radius: number;
  startPosition: Position;
  endPosition: Position;
  numberOfSteps: number;
};

function createDiscOnCanvas(num: number): Disc {
  console.log("xxx  laufende nummer:", num);
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


export const startedDiscs$ = new Subject(); // add started discs here
export const finishedDiscs$ = new Subject(); // add started discs here
export const numberOfActiveDiscs$ = merge(
  startedDiscs$.pipe(
    map(() => 1), // add 1 in scan() below
  ),
  finishedDiscs$.pipe(
    map(() => -1), // subtract 1 in scan() below
  ),
).pipe(
  scan((total: number, current: number) => total + current, 0),
  startWith(0),
);

export const discs$ = interval(1000).pipe(
  map((num) => createDiscOnCanvas(num)),
  share(),
);


discs$.subscribe(startedDiscs$);  // this stops here because the generator runs endlessly
discs$.subscribe((disc) => console.log("xxx disc1", disc));
discs$.subscribe((disc) => console.log("xxx disc2", disc));

startedDiscs$.subscribe(num => console.log("xxx startedDiscs", num ));

// debug
// discs$.pipe(take(10), tap(console.log)).subscribe(startedDiscs$); // this stops here


// test:

numberOfActiveDiscs$.subscribe((count) => console.log("xxx number active", count));


console.log("dingsi popingsi");


// utils

function sleep(ms: number) {  // should be "awaited" (-> returns a Promise), althoungh not defined as async
	return new Promise(resolve => setTimeout(resolve, ms));
}

