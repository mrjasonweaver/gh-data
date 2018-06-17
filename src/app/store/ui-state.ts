import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { initialUiState, IUiState } from '../models/ui-state';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, filter, mergeMap, debounceTime } from 'rxjs/operators';

@Injectable()
export class UiStateStore {

  initialEvent = { target: { value: ''} };

  private _route: BehaviorSubject<any> = new BehaviorSubject('');
  public readonly route: Observable<any> = this._route;
  private _uiState: BehaviorSubject<any> = new BehaviorSubject(initialUiState);
  private _routeQueryParams: Observable<ParamMap>;
  private _eventStream: BehaviorSubject<any> = new BehaviorSubject(this.initialEvent);

  eventStream: Observable<string> = this._eventStream.pipe(
    debounceTime(300),
    map(e => e.target.value)
  );

  readonly uiState: Observable<IUiState> = this._uiState;

  constructor(private r: ActivatedRoute, private router: Router) {

    this._routeQueryParams = r.queryParamMap;

    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => r),
      map(rt => rt.firstChild),
      filter(rt => rt.outlet === 'primary'),
      mergeMap(rt => rt.data)
    ).subscribe(x => this._route.next(x));

  }

  get routeQueryParams$() {
    return this._routeQueryParams;
  }
  get currentRoute$() {
    return this.route;
  }
  get uiState$() {
    return this.uiState;
  }
  get inputValue$() {
    return this.eventStream;
  }

  onInputChange(e) {
    return this._eventStream.next(e);
  }

  startAction(message: string, isSelected: boolean) {
    this._uiState.next({
      actionOngoing: true,
      isSelected,
      message
    });
  }

  endAction(message: string, isSelected: boolean) {
    this._uiState.next({
      actionOngoing: false,
      isSelected,
      message
    });
  }

}
