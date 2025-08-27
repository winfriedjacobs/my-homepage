import { delay, map, mergeMap, share, tap } from "rxjs";
import { Step, steps } from "@/model/step";
import { Disc } from "@/model/disc";
import {
  discs$,
  finishedDiscs$,
  numberOfActiveDiscs$,
  stepsFromDiscDelayed$,
} from "./discs";

// tests:

function test01() {
  discs$.pipe(delay(20000)).subscribe(finishedDiscs$); // finished after 20 seconds
  numberOfActiveDiscs$.subscribe((count) =>
    console.log("xxx number active", count),
  );
}

function test02() {
  const x$ = discs$.pipe(
    mergeMap((disc: Disc) =>
      stepsFromDiscDelayed$(300, disc).pipe(
        map((step: Step) => [disc, step] as [Disc, Step]),
      ),
    ),
    tap(([d, s]: [Disc, Step]) =>
      console.log("disc, step", d.id, s.sequentialNumber),
    ),
    share(),
  );

  x$.subscribe();

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
