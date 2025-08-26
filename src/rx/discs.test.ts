import { discs$ } from "./discs";
import {
  count,
  delay,
} from "rxjs";


// tests:

discs$.pipe(delay(20000)).subscribe(finishedDiscs$);
numberOfActiveDiscs$
  .pipe(
    map((count) => count < MAX_NUMBER_DISCS), // send a false to flag when count >= MAX_NUMBER_DISCS
  )
  .subscribe(flag$);

numberOfActiveDiscs$.subscribe((count) =>
  console.log("xxx number active", count),
);

console.log("dingsi popingsi");
