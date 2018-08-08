import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { makeKeyStr } from '../utilities/objects/objects';
import { CacheService } from '../services/cache.service';
import { UiStateStore } from './ui-state';
import { PullRequestsService } from '../services/pullrequests/pullrequests.service';
import { IIssuesObject, IParams, IIssue, initialIssuesObject } from '../models/issues';

@Injectable()
export class PullRequestsStore {
  private _key: string;
  private _prsObject: BehaviorSubject<IIssuesObject> = new BehaviorSubject(initialIssuesObject);
  public readonly prsObject: Observable<IIssuesObject> = this._prsObject;
  config = { duration: 1500 };

  constructor(
    private pullRequestsService: PullRequestsService,
    private cache: CacheService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get pullRequests$(): Observable<IIssue[]> {
    return this.prsObject.pipe( pluck('items') );
  }
  get pullRequestsCount$(): Observable<number> {
    return this.prsObject.pipe( pluck('total_count') );
  }

  loadPullRequests(p: IParams): Subscription | void {
    this._key = makeKeyStr(p);
    this.uiStateStore.startAction('Retrieving Pull Requests...', false);
    return this.cache.validKey(this._key) ? this.loadCache() : this.loadApi(p);
  }

  loadCache(): void {
    const issues = this.cache.getCache(this._key).value;
    this._prsObject.next(issues);
    this.uiStateStore.endAction('Pull Requests retrieved', false);
  }

  loadApi(p: IParams): Subscription {
    return this.pullRequestsService.getPullRequests(p).subscribe(res => {
      this.cache.setCache(this._key, res);
      this._prsObject.next(res);
      this.uiStateStore.endAction('Pull Requests retrieved', false);
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving Pull Requests', false);
        this.snackBar.open('No Pull Requests found', null, this.config);
      }
    );
  }

}