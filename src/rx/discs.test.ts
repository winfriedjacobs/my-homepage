import { discs$, finishedDiscs$, flag$, MAX_NUMBER_DISCS, numberOfActiveDiscs$ } from "./discs";
import { count, delay, map } from "rxjs";

// tests:

function test01() {
  discs$.pipe(delay(20000)).subscribe(finishedDiscs$);
  numberOfActiveDiscs$
    .pipe(
      map((count) => count < MAX_NUMBER_DISCS), // send a false to flag when count >= MAX_NUMBER_DISCS
    )
    .subscribe(flag$);

  numberOfActiveDiscs$.subscribe((count) =>
    console.log("xxx number active", count),
  );
}

if (true) {
  test01();
}

console.log("ende discs.test");
