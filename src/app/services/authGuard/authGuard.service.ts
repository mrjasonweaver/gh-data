import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserStore } from '../../store/currentUser';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private currentUserStore: CurrentUserStore, private router: Router ) {}

  canActivate(): Observable<boolean> {
    const loggedIn$ = this.currentUserStore.userLoggedIn$;
    this.routeTo(loggedIn$);
    return this.currentUserStore.userLoggedIn$;
  }

  routeTo(loggedIn$: Observable<boolean>): Subscription {
    return loggedIn$.subscribe(x => !x ? this.router.navigate(['login']) : null);
  }
}
