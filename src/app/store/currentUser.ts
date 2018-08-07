import { Injectable } from '@angular/core';
import { CurrentUserService } from '../services/currentUser/currentUser.service';
import { ICurrentUser, initialCurrentUser } from '../models/currentUser';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { UiStateStore } from './ui-state';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class CurrentUserStore {
  private _currentUser: BehaviorSubject<ICurrentUser> = new BehaviorSubject(initialCurrentUser);
  readonly currentUser: Observable<ICurrentUser> = this._currentUser.asObservable();
  localUserData;
  config = { duration: 1500 };

  constructor(
    private currentUserService: CurrentUserService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.localUserData = JSON.parse(localStorage.getItem('ghdata-app-username'));
    if (this.localUserData) {
      this.loadCurrentUser();
    }
  }

  get currentUser$(): Observable<ICurrentUser> {
    return this.currentUser;
  }
  get userLoggedIn$(): Observable<boolean> {
    return this.currentUser.pipe( map(user => user.login || this.localUserData ? true : false) );
  }

  logoutCurrentUser(): void {
    this.uiStateStore.startAction('Logging out user...', false);
    localStorage.removeItem('ghdata-app-username');
    this.localUserData = null;
    this._currentUser.next(initialCurrentUser);
    this.uiStateStore.endAction('User logged out', false);
    this.router.navigate(['/login']);
  }

  loadCurrentUser(un?: string): Subscription | void {
    this.uiStateStore.startAction('Retrieving user...', false);
    return this.localUserData ? this.loadUserFromLocalStorage(this.localUserData) : this.loadUserFromApi(un);
  }

  loadUserFromLocalStorage(localUserData: ICurrentUser): void {
    this._currentUser.next(localUserData);
    this.uiStateStore.endAction('User retrieved', false);
  }

  loadUserFromApi(un: string): Subscription {
    return this.currentUserService.getUserByUsername(un).subscribe(res => {
      localStorage.setItem('ghdata-app-username', JSON.stringify(res));
      this._currentUser.next(res);
      this.uiStateStore.endAction('User retrieved', false);
      this.router.navigate(['/dashboard']);
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving user', false);
        this.snackBar.open('No user found', null, this.config);
      }
    );
  }

}
