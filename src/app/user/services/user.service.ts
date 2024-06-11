import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { createTrigger } from 'ngx-lift';
import { BehaviorSubject, delay, map } from 'rxjs';

import { PaginationResponse } from '../../shared/models/pagination.model';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);

  refreshTrigger = createTrigger();

  #refreshBS = new BehaviorSubject<void>(undefined);
  refresh$ = this.#refreshBS.asObservable();

  refreshList() {
    this.#refreshBS.next();
  }

  // Below are Raw APIs
  getUsers(params?: Params) {
    return this.#http.get<PaginationResponse<User>>(`https://randomuser.me/api`, { params }).pipe(
      delay(500),
      map(res => ({ ...res, info: { ...res.info, total: 100 } }) as PaginationResponse<User>),
    ); // fake resultTotal 100
  }

  getUser = (id: number) => this.#http.get<User[]>(`http://jsonplaceholder.typicode.com/users/${id}`);

  getTodos = (userId: number) => this.#http.get<Todo[]>(`http://jsonplaceholder.typicode.com/todos`, { params: { userId } });
}
