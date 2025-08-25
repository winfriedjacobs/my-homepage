import { Position, RGBA } from "@/model/basics";
import {
  randomNumberOfSteps,
  randomPositionForDisc,
  randomRadius,
} from "@/model/random";
import {
  delay,
  interval,
  map,
  merge,
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


// -- Obervables

export const discs$ = interval(1000).pipe(
  map((num) => createDiscOnCanvas(num + 1)),
  share(),
);


export const finishedDiscs$ = new Subject(); // add started discs here
export const numberOfActiveDiscs$ = merge(
  discs$.pipe(
    map(() => 1), // add 1 in scan() below
    tap(()=>console.log("xxx added")),
  ),
  finishedDiscs$.pipe(
    map(() => -1), // subtract 1 in scan() below
    tap(()=>console.log("xxx subtracted")),
  ),
).pipe(
  scan((total: number, current: number) => total + current, 0),
  startWith(0),
  tap(n=>console.log("xxx count current:", n))
);




// test:

discs$.pipe(
  delay(2000)
).subscribe(finishedDiscs$);

numberOfActiveDiscs$.subscribe((count) => console.log("xxx number active", count));


console.log("dingsi popingsi");


// utils

function sleep(ms: number) {  // should be "awaited" (-> returns a Promise), althoungh not defined as async
	return new Promise(resolve => setTimeout(resolve, ms));
}

