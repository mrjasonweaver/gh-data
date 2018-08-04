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
  config = { duration: 1500 };

  constructor(
    private currentUserService: CurrentUserService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  get currentUser$(): Observable<ICurrentUser> {
    return this.currentUser;
  }
  get userLoggedIn$(): Observable<boolean> {
    return this.currentUser.pipe( map(user => user.login ? true : false) );
  }

  loadCurrentUser(un: string): Subscription {
    this.uiStateStore.startAction('Retrieving user...', false);
    return this.currentUserService.getUserByUsername(un).subscribe(res => {
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
