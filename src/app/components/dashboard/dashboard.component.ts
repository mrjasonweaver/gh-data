import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IParams, params } from '../../models/issues';
import { IssuesStore } from '../../store/issues';
import { PullRequestsStore } from '../../store/pullrequests';
import { CurrentUserStore } from '../../store/currentUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  cuSub: Subscription;
  currentUser;

  constructor(
    public currentUserStore: CurrentUserStore,
    public issuesStore: IssuesStore,
    public pullRequestsStore: PullRequestsStore
  ) { }

  ngOnInit() {
    this.cuSub = this.currentUserStore.currentUser$.subscribe(user => this.currentUser = user.login);
    this.loadUserIssues();
    this.loadUserPullRequests();
  }

  ngOnDestroy() {
    this.cuSub.unsubscribe();
  }

  private getParams(): IParams {
    return {
      ...params,
      searchTerm: this.currentUser
    };
  }

  private loadUserIssues(): void {
    this.issuesStore.loadIssues(this.getParams());
  }

  private loadUserPullRequests(): void {
    this.pullRequestsStore.loadPullRequests(this.getParams());
  }

}
