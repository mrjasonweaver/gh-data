import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIssuesObject, IIssue, IParams } from '../../models/issues';

@Injectable()
export class IssuesService {
  url = 'https://api.github.com/search/issues';

  constructor(private http: HttpClient) {}

  getIssues(params: IParams): Observable<IIssuesObject> {
    const unRepoSegments = `?q=user:${params.searchTerm}&sort=${params.sort}&order=${params.order}`;
    const queryParamsSegments = `&page=${params.page}&per_page=${params.perPage}`;
    return this.http.get<IIssuesObject>(`${this.url}${unRepoSegments}${queryParamsSegments}`);
  }

}
