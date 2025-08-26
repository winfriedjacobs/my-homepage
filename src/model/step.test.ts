import { from, tap, of, zip, interval } from "rxjs";
import { createDiscOnCanvas, Disc } from "@/model/disc";
import { steps } from "@/model/step";

if (false) {
  function* generate() {
    for (let i = 0; i < 100; i++) {
      yield "wert" + i;
    }
  }

  // zip(from(generate()), interval(1000)).pipe(
  zip(generate(), interval(1000))
    .pipe(tap((val) => console.log("of_xxx", val)))
    .subscribe();
}

if (true) {
  const disc = createDiscOnCanvas(23);

  from(steps(disc.startPosition, disc.endPosition, disc.numberOfSteps))
    .pipe(
      tap((step) => {
        console.log("step_seqNum:", step.sequentialNumber);
        console.log("step_opacity:", step.opacity);
      }),
    )
    .subscribe();

  console.log("numberOfSteps", disc.numberOfSteps);
}

console.log("Ende");
