import { discs$, finishedDiscs$, flag$, MAX_NUMBER_DISCS, numberOfActiveDiscs$ } from "./discs";
import { count, delay, map } from "rxjs";

// tests:

function test01() {
  discs$.pipe(delay(20000)).subscribe(finishedDiscs$);  // finished after 20 seconds
  numberOfActiveDiscs$.subscribe((count) =>
    console.log("xxx number active", count),
  );
}

function test02() {
  discs$.pipe(delay(20000)).subscribe(finishedDiscs$);  // finished after 20 seconds
  numberOfActiveDiscs$.subscribe((count) =>
    console.log("xxx number active", count),
  );
}


if (false) {
  test01();
}

if (true) {
  test02();
}


console.log("ende discs.test");
