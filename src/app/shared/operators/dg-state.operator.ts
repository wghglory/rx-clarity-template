import { ClrDatagridStateInterface } from '@clr/angular';
import { isEqual } from 'lodash-es';
import { debounce, distinctUntilChanged, map, Observable, pairwise, pipe, startWith, timer, UnaryFunction } from 'rxjs';

import { CLR_DG_DEFAULT_STATE } from '../const';

export function dgState(): UnaryFunction<Observable<ClrDatagridStateInterface | null>, Observable<ClrDatagridStateInterface>> {
  return pipe(
    // prepare old and new states filters in order to delay
    // since behaviorSubject and clrDatagrid emits null and null, no need to `startWith(null)`
    pairwise(),
    // only when filter changes, timer(500) to defer to simulate typeahead.
    debounce(([prev, curr]) => (isEqual(prev?.filters, curr?.filters) ? timer(0) : timer(500))),
    map(([prev, curr]) => curr),
    // if prev and curr state are the same, no need to emit. e.g. filter was 'a', user type 'aa' and quickly rollback to 'a'
    distinctUntilChanged(isEqual),
  );
}

export function dgStore(): UnaryFunction<Observable<ClrDatagridStateInterface>, Observable<ClrDatagridStateInterface>> {
  return pipe(
    // prepare old and new states filters in order to delay
    pairwise(),
    // only when filter changes, timer(500) to defer to simulate typeahead.
    debounce(([prev, curr]) => (isEqual(prev?.filters, curr?.filters) ? timer(0) : timer(500))),
    map(([prev, curr]) => curr),
    // allow refresh with the same state, so remove distinctUntilChanged
    startWith(CLR_DG_DEFAULT_STATE),
  );
}
