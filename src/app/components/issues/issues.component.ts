import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IParams, params } from '../../models/issues';
import { IssuesStore } from '../../store/issues';
import { UiStateStore } from '../../store/ui-state';
import { CurrentUserStore } from '../../store/currentUser';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit, OnDestroy {
  routeQueryParams;
  displayedColumns = ['number', 'user', 'type', 'title', 'created', 'comments'];
  pSub: Subscription;
  cuSub: Subscription;
  currentUser;

  constructor(
    public issuesStore: IssuesStore,
    public uiStateStore: UiStateStore,
    public currentUserStore: CurrentUserStore,
    private router: Router
  ) {
    this.cuSub = this.currentUserStore.currentUser$.subscribe(user => this.currentUser = user.login);
  }

  ngOnInit() {
    this.navigate();
  }

  ngOnDestroy() {
    this.pSub.unsubscribe();
    this.cuSub.unsubscribe();
  }

  private getParams(p): IParams {
    return {
      ...params,
      type: p.get('type') || params.type,
      sort: p.get('sort') || params.sort,
      order: p.get('order') || params.order,
      page: p.get('page') || params.page,
      perPage: p.get('perPage') || params.perPage,
      searchTerm: p.get('searchTerm') || this.currentUser
    };
  }

  private navigate(): Subscription {
    return this.pSub = this.uiStateStore.routeQueryParams$.subscribe(p => {
      this.routeQueryParams = p;
      return this.issuesStore.loadIssues(this.getParams(p));
    });
  }

  onPageChange(event, routeQueryParams) {
    const page = event.pageIndex + 1;
    const { sort, order, searchTerm } = routeQueryParams;
    return this.router.navigate(['/issues'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSortData(event, routeQueryParams) {
    const { active: sort, direction: order } = event;
    const { page, searchTerm } = routeQueryParams;
    return this.router.navigate(['/issues'], { queryParams: { sort, order, page, searchTerm } });
  }

}
