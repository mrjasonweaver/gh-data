import { Component, OnInit } from '@angular/core';
import { UiStateStore } from '../../store/ui-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routeQueryParams;
  currentRoute;
  searchTerm = '';
  constructor(public uiStateStore: UiStateStore, private router: Router) {}

  ngOnInit() {
    this.uiStateStore.routeQueryParams$.subscribe(qp => this.routeQueryParams = qp);
    this.uiStateStore.inputValue$.subscribe(iv => {
      this.searchTerm = iv;
      return this.searchTerm ? this.onSearchChange() : null;
    });
    this.uiStateStore.currentRoute$.subscribe(cr => cr ? this.currentRoute = cr.title.toLowerCase() : null);
  }

  get showSearch(): boolean {
    const rt = this.currentRoute;
    const dashboard = rt === 'dashboard';
    const login = rt === 'login';
    return !login && !dashboard;
  }

  onSearchChange() {
    const { sort, order, page } = this.routeQueryParams.params;
    return this.router.navigate([`/${this.currentRoute}`], { queryParams: { sort, order, page, searchTerm: this.searchTerm } });
  }
}
