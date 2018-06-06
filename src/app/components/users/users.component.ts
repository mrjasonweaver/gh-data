import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersStore } from '../../store/users';
import { UiStateStore } from '../../store/ui-state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  routeQueryParams;
  searchTerm = '';
  displayedColumns = ['checkbox', 'id', 'login', 'type', 'score'];

  constructor(
    public usersStore: UsersStore,
    public uiStateStore: UiStateStore,
    private router: Router
  ) { }

  ngOnInit() {
    this.uiStateStore.routeQueryParams$.subscribe(x => this.routeQueryParams = x);
  }

  onPageChange(event) {
    const page = event.pageIndex + 1;
    const { sort, order, searchTerm } = this.routeQueryParams.params;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSortData(event) {
    const { active: sort, direction: order } = event;
    const { page, searchTerm } = this.routeQueryParams.params;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSelect(value: string) {
    const selected = value;
    const { sort, order, page, searchTerm } = this.routeQueryParams.params;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm, selected } });
  }

  onSidenavClose() {
    const { sort, order, page, searchTerm } = this.routeQueryParams.params;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm } });
  }

}
