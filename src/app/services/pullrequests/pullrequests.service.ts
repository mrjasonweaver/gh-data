import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IIssuesObject, IParams } from '../../models/issues';

@Injectable()
export class PullRequestsService {
  url = 'https://api.github.com/search/issues';

  constructor(private http: HttpClient) {}

  getPullRequests(params: IParams): Observable<IIssuesObject> {
    const unRepoSegments = `?q=user:${params.searchTerm}+type:pr+is:open&sort=${params.sort}&order=${params.order}`;
    const queryParamsSegments = `&page=${params.page}&per_page=${params.perPage}`;
    return this.http.get<IIssuesObject>(`${this.url}${unRepoSegments}${queryParamsSegments}`);
  }

}
