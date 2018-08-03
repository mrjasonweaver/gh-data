import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd, Data } from '@angular/router';
import { initialUiState, IUiState } from '../models/ui-state';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, mergeMap, debounceTime } from 'rxjs/operators';

interface IEventTarget {
  target: { value: string; };
}
@Injectable()
export class UiStateStore {

  initialEvent = { target: { value: ''} };

  private _route: BehaviorSubject<Data | string> = new BehaviorSubject('');
  readonly route: Observable<Data | string> = this._route.asObservable();
  private _uiState: BehaviorSubject<IUiState> = new BehaviorSubject(initialUiState);
  readonly uiState: Observable<IUiState> = this._uiState.asObservable();
  private _routeQueryParams: Observable<ParamMap>;
  private _eventStream: BehaviorSubject<IEventTarget> = new BehaviorSubject(this.initialEvent);
  eventStream: Observable<string> = this._eventStream.pipe(
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
