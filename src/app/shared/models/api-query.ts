import { HttpErrorResponse } from '@angular/common/http';

export interface ApiQuery<T> {
  loading: boolean;
  error: HttpErrorResponse | null;
  data: T | null;
}
