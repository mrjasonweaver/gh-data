import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrentUser } from '../../models/currentUser';

@Injectable()
export class CurrentUserService {
  url = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>(`${this.url}/${username}`);
  }

}
