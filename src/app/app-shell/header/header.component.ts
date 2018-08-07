import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiStateStore } from '../../store/ui-state';
import { CurrentUserStore } from '../../store/currentUser';

export interface IRouteData {
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routeQueryParams;
  currentRoute;
  searchTerm = '';
  constructor(
    public uiStateStore: UiStateStore,
    public currentUserStore: CurrentUserStore,
    private router: Router
  ) {}

  onValueChange(e: KeyboardEvent) {
    return this.uiStateStore.onInputChange(e);
  }

  ngOnInit() {
    this.uiStateStore.routeQueryParams$.subscribe(qp => this.routeQueryParams = qp);
    this.uiStateStore.inputValue$.subscribe(iv => {
      this.searchTerm = iv;
      if (this.searchTerm) { this.onSearchChange(); }
    });
    this.uiStateStore.currentRoute$.subscribe((cr: IRouteData) => cr ? this.currentRoute = cr.title.toLowerCase() : null);
  }

  get showSearch(): boolean {
    const rt = this.currentRoute;
    const dashboard = rt === 'dashboard';
    const login = rt === 'login';
    return !login && !dashboard;
  }

  onSearchChange(): Promise<boolean> {
    const { sort, order, page } = this.routeQueryParams.params;
    return this.router.navigate([`/${this.currentRoute}`], { queryParams: { sort, order, page, searchTerm: this.searchTerm } });
  }

  logout() {
    return this.currentUserStore.logoutCurrentUser();
  }
}
