import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IParams, params } from '../../models/issues';
import { IssuesStore } from '../../store/issues';
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
    public issuesStore: IssuesStore
  ) { }

  ngOnInit() {
    this.cuSub = this.currentUserStore.currentUser$.subscribe(user => this.currentUser = user.login);
    this.loadUserData();
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

  private loadUserData(): void | Subscription {
    return this.issuesStore.loadIssues(this.getParams());
  }

}
