import { Injectable } from '@angular/core';
import { IssuesService } from '../services/issues/issues.service';
import { IIssuesObject, IParams, IIssue, params, initialIssuesObject } from '../models/issues';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { UiStateStore } from './ui-state';
import { MatSnackBar } from '@angular/material';
import { pluck } from 'rxjs/operators';
import { makeKeyStr } from '../utilities/objects/objects';
import { CacheService } from '../services/cache.service';

@Injectable()
export class IssuesStore {
  private _key: string;
  private _issuesObject: BehaviorSubject<IIssuesObject> = new BehaviorSubject(initialIssuesObject);
  public readonly issuesObject: Observable<IIssuesObject> = this._issuesObject;
  config = { duration: 1500 };

  constructor(
    private issuesService: IssuesService,
    private cache: CacheService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get issues$(): Observable<IIssue[]> {
    return this.issuesObject.pipe( pluck('items') );
  }
  get issuesCount$(): Observable<number> {
    return this.issuesObject.pipe( pluck('total_count') );
  }

  getParams(p): IParams {
    return {
      ...params,
      sort: p.get('sort') || params.sort,
      order: p.get('order') || params.order,
      page: p.get('page') || params.page,
      perPage: p.get('perPage') || params.perPage,
      searchTerm: p.get('searchTerm') || params.searchTerm
    };
  }

  loadIssues(p: IParams): Subscription | void {
    this._key = makeKeyStr(p);
    this.uiStateStore.startAction('Retrieving Issues...', false);
    return this.cache.validKey(this._key) ? this.loadCache() : this.loadApi(p);
  }

  loadCache(): void {
    const issues = this.cache.getCache(this._key).value;
    this._issuesObject.next(issues);
    this.uiStateStore.endAction('Issues retrieved', false);
  }

  loadApi(p: IParams): Subscription {
    return this.issuesService.getIssues(p).subscribe(res => {
      this.cache.setCache(this._key, res);
      this._issuesObject.next(res);
      this.uiStateStore.endAction('Issues retrieved', false);
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving issues', false);
        this.snackBar.open('No issues found', null, this.config);
      }
    );
  }

}
