/**
 * https://dev.to/rensjaspers/beginners-guide-loading-data-based-on-changes-to-other-data-in-angular-106k
 */
import { catchError, map, Observable, of, OperatorFunction, scan, startWith, switchMap } from 'rxjs';
import { ApiQuery } from '../models/api-query';

export function switchMapWithLoading<T, K>(observableFunction: (value: K) => Observable<T>): OperatorFunction<K, ApiQuery<T>> {
  return (source: Observable<K>) =>
    source.pipe(
      switchMap(value =>
        observableFunction(value).pipe(
          map(data => ({ data, loading: false, error: null })),
          catchError(error => of({ error, loading: false, data: null })),
          startWith({ error: null, loading: true, data: null }),
        ),
      ),
      scan((state: ApiQuery<T>, change: ApiQuery<T>) => ({
        ...state,
        ...change,
      })),
    );
}
