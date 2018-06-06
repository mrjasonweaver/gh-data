import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsersObject, IUser, IParams } from '../../models/users';

@Injectable()
export class UsersService {
  url = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {}

  getUsers(params: IParams): Observable<IUsersObject> {
    const paramSegments = `?q=${params.searchTerm}&sort=${params.sort}&order=${params.order}`;
    const queryParamsSegments = `&page=${params.page}&per_page=${params.perPage}`;
    return this.http.get<IUsersObject>(`${this.url}${paramSegments}${queryParamsSegments}`);
  }

}
