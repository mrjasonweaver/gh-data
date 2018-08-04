import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CurrentUserStore } from '../../store/currentUser';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private currentUserStore: CurrentUserStore ) {}

  canActivate(): Observable<boolean> {
    return this.currentUserStore.userLoggedIn$;
  }
}
