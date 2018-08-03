import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesStore } from '../../store/issues';
import { UiStateStore } from '../../store/ui-state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {
  routeQueryParams;
  displayedColumns = ['number', 'user', 'type', 'title', 'created', 'comments'];
  pSub: Subscription;

  constructor(
    public issuesStore: IssuesStore,
    public uiStateStore: UiStateStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.navigate();
  }

  ngOnDestroy() {
    this.pSub.unsubscribe();
  }

  private navigate(): Subscription {
    return this.pSub = this.uiStateStore.routeQueryParams$.subscribe(p => {
      this.routeQueryParams = p;
      return this.issuesStore.loadIssues(this.issuesStore.getParams(p));
    });
  }

  onPageChange(event, routeQueryParams) {
    const page = event.pageIndex + 1;
    const { sort, order, searchTerm } = routeQueryParams;
    return this.router.navigate(['/reports'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSortData(event, routeQueryParams) {
    const { active: sort, direction: order } = event;
    const { page, searchTerm } = routeQueryParams;
    return this.router.navigate(['/reports'], { queryParams: { sort, order, page, searchTerm } });
  }

}
