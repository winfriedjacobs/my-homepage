import { Observable } from 'rxjs';

function fromGenerator(gen: Generator, delay: number): Observable<any> {
  return new Observable(observer => {
    const iterator = gen;
    
    function scheduleNext() {
      const result = iterator.next();
      if (!result.done) {
        observer.next(result.value);
        setTimeout(scheduleNext, delay);
      } else {
        observer.complete();
      }
    }
    
    scheduleNext();
    
    return () => {
      // Cleanup if unsubscribed
      iterator.return(undefined);
    };
  });
}

// Beispiel zur Verwendung:
/*
// Generator-Funktion
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