import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Data, Router, NavigationEnd, Event } from '@angular/router';
import { initialUiState, IUiState } from '../models/ui-state';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, filter, mergeMap, debounceTime } from 'rxjs/operators';

@Injectable()
export class UiStateStore {

  private _isSelected = false;
  private _uiState: BehaviorSubject<any> = new BehaviorSubject(initialUiState);
  public readonly uiState: Observable<IUiState> = this._uiState;
  private _routeQueryParams: Observable<ParamMap>;
  private _route;
  initialEvent = { target: { value: ''} };
  private _eventStream: BehaviorSubject<any> = new BehaviorSubject(this.initialEvent);
  public eventStream: Observable<string> = this._eventStream.pipe(
    debounceTime(300),
    map(e => e.target.value)
  );

  constructor(private r: ActivatedRoute, private router: Router) {

    this._routeQueryParams = r.queryParamMap;

    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => r),
      map(rt => rt.firstChild),
      filter(rt => rt.outlet === 'primary'),
      mergeMap(rt => rt.data)
    ).subscribe(x => this._route = x);

    this.isSelected();

  }

  get routeQueryParams$() {
    return this._routeQueryParams;
  }
  get route$() {
    return this._route;
  }
  get uiState$() {
    return this.uiState;
  }
  get inputValue$() {
    return this.eventStream;
  }

  isSelected() {
    return this._routeQueryParams.subscribe(p => this._isSelected = p.get('selected') !== null);
  }

  onInputChange(e) {
    return this._eventStream.next(e);
  }

  startAction(message: string) {
    this._uiState.next({
      actionOngoing: true,
      isSelected: this._isSelected,
      message
    });
  }

  endAction(message: string) {
    this._uiState.next({
      actionOngoing: false,
      isSelected: this._isSelected,
      message
    });
  }

}
