import { Component, OnInit } from '@angular/core';
import { UiStateStore } from '../../store/ui-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public uiStateStore: UiStateStore) {}
}
