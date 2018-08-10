import { Component, OnInit } from '@angular/core';
import { CurrentUserStore } from '../../store/currentUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private currentUserStore: CurrentUserStore) {}

  ngOnInit() {
  }

  onValueChange(event): void {
    const username = event.target.value;
    this.currentUserStore.loadCurrentUser(username);
  }

}
