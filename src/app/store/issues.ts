import { Injectable } from '@angular/core';
import { IssuesService } from '../services/issues/issues.service';
import { IIssuesObject, IIssue, IParams, params } from '../models/issues';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UiStateStore } from './ui-state';
import { MatSnackBar } from '@angular/material';
import { pluck } from 'rxjs/operators';

@Injectable()
export class IssuesStore {

  private _issuesObject: BehaviorSubject<any> = new BehaviorSubject({items: []});
  private _issuesWithComments: BehaviorSubject<any> = new BehaviorSubject([]);
  public readonly issuesObject: Observable<IIssuesObject> = this._issuesObject;
  public readonly issuesWithComments: Observable<IIssue[]> = this._issuesWithComments;
  config = { duration: 1500 };

  constructor(
    private issuesService: IssuesService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) {
    this.navigate();
  }

  get issues$() {
    return this.issuesObject.pipe( pluck('items') );
  }
  get issuesCount$() {
    return this.issuesObject.pipe( pluck('total_count') );
  }
  get issuesWithComments$() {
    return this.issuesWithComments;
  }

  navigate() {
    this.uiStateStore.routeQueryParams$.subscribe(x => {
      this.loadIssues(
        {
          ...params,
          sort: x.get('sort') || params.sort,
          order: x.get('order') || params.order,
          page: x.get('page') || params.page,
          perPage: x.get('perPage') || params.perPage,
          searchTerm: x.get('searchTerm') || params.searchTerm
        }
      );
    });
  }

  loadIssues(userParams) {
    this.uiStateStore.startAction('Retrieving issues...');
    this.issuesService.getIssues(userParams)
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
