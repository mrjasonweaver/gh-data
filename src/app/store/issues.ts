import { Injectable } from '@angular/core';
import { IssuesService } from '../services/issues/issues.service';
import { IIssuesObject, IIssue, IParams, params } from '../models/issues';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { UiStateStore } from './ui-state';
import { MatSnackBar } from '@angular/material';
import { pluck } from 'rxjs/operators';
import { makeKeyStr } from '../utilities/objects/objects';
import { CacheService } from '../services/cache.service';

@Injectable()
export class IssuesStore {

  private _issuesObject: BehaviorSubject<any> = new BehaviorSubject({items: []});
  private _issuesWithComments: BehaviorSubject<any> = new BehaviorSubject([]);
  public readonly issuesObject: Observable<IIssuesObject> = this._issuesObject;
  public readonly issuesWithComments: Observable<IIssue[]> = this._issuesWithComments;
  config = { duration: 1500 };
  pSub: Subscription;
  rSub: Subscription;

  constructor(
    private issuesService: IssuesService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get issues$() {
    return this.issuesObject.pipe( pluck('items') );
  }
  get issuesCount$() {
    return this.issuesObject.pipe( pluck('total_count') );
  }
  get issuesWithComments$() {
    return this.issuesWithComments;
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

  loadIssues(p: IParams) {
    this.uiStateStore.startAction('Retrieving issues...');
    console.log('loadIssues');
    this.issuesService.getIssues(p)
      .subscribe(res => {
        const comments = res.items.filter(x => x.comments > 0);
        this._issuesWithComments.next(comments);
        this._issuesObject.next(res);
        this.uiStateStore.endAction('Issues retrieved');
      },
        err =>  {
          this.uiStateStore.endAction('Error retrieving issues');
          this.snackBar.open('No issues found', null, this.config);
        }
      );
  }

}
