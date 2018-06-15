import { Injectable } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { IUsersObject, IUser, IParams, params } from '../models/users';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { UiStateStore } from './ui-state';
import { MatSnackBar } from '@angular/material';
import { pluck } from 'rxjs/operators';
import { makeKeyStr } from '../utilities/objects/objects';
import { CacheService } from '../services/cache.service';

@Injectable()
export class UsersStore {
  private _key: string;
  private _selected: string;
  private _usersObject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly usersObject: Observable<IUsersObject> = this._usersObject;
  private _userSelected: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly userSelected: Observable<IUser> = this._userSelected;
  config = { duration: 1500 };

  constructor(
    private usersService: UsersService,
    private cache: CacheService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get users$() {
    return this.usersObject.pipe( pluck('items') );
  }
  get usersCount$() {
    return this.usersObject.pipe( pluck('total_count') );
  }
  get userSelected$() {
    return this.userSelected;
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

  loadUsers(p: IParams, s): void {
    this._key = makeKeyStr(p);
    this.uiStateStore.startAction('Retrieving Users...');
    return this.cache.validKey(this._key) ? this.loadCache(s) : this.loadApi(p, s);
  }

  loadCache(s): void {
    const users = this.cache.getCache(this._key).value;
    const selected = users.items.filter(x => x.id === +s)[0];
    this._usersObject.next(users);
    this._userSelected.next(selected);
    this.uiStateStore.endAction('Users retrieved');
  }

  loadApi(p: IParams, s): void {
    this.usersService.getUsers(p).subscribe(res => {
      this.cache.setCache(this._key, res);
      this._usersObject.next(res);
      this._userSelected.next(res.items.filter(x => x.id === +s)[0]);
      this.uiStateStore.endAction('Users retrieved');
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving Users');
        this.snackBar.open('Error retrieving Users', null, this.config);
      }
    );
  }

}
