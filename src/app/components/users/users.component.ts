import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersStore } from '../../store/users';
import { UiStateStore } from '../../store/ui-state';
import { params } from '../../models/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  routeQueryParams;
  searchTerm = '';
  displayedColumns = ['checkbox', 'id', 'login', 'type', 'score'];
  pSub: Subscription;

  constructor(
    public usersStore: UsersStore,
    public uiStateStore: UiStateStore,
    private router: Router
  ) { }

  ngOnInit() {
    this.navigate();
  }

  ngOnDestroy() {
    this.pSub.unsubscribe();
  }

  private navigate(): void {
    this.pSub = this.uiStateStore.routeQueryParams$.subscribe(p => {
      this.routeQueryParams = p;
      const ap = {
        selected: p.get('selected') || params.selected,
        isSelected: p.get('selected') !== null,
      };
      return this.usersStore.loadUsers(this.usersStore.getParams(p), ap);
    });
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
