import { Component, OnInit } from '@angular/core';
import { CurrentUserStore } from '../../store/currentUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private currentUserStore: CurrentUserStore) { }

  ngOnInit() {
  }

}
