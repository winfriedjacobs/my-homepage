import { interval, map, Observable, zip } from 'rxjs';


export function fromIteratorWithInterval(generator: Generator, intervalLength: number): Observable<any> {
  return zip(
    interval(intervalLength),
    generator, // here the same as: from(generator)
  ).pipe(map(([_, elem]) => elem));
}
// Usage examples: see below

// alternative, basic implementation
/*
export function fromIteratorWithInterval(generator: Generator, intervalLength: number): Observable<any> {
  return new Observable(observer => {
    function scheduleNext() {
      const result = generator.next();
      if (!result.done) {
        observer.next(result.value);
        setTimeout(scheduleNext, intervalLength);
      } else {
        observer.complete();
      }
    }
    
    scheduleNext();
    
    return () => {
      // Cleanup if unsubscribed
      generator.return(undefined);
    };
  });
}
*/

// Usage examples
/*
// Generator function
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

// Observable erstellen
const obs$ = fromGenerator(gen(), 1000);

// Subscription
obs$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
});
*/