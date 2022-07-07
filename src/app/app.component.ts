import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'admin-login-frontend';
  loggedIn: any;
  private authSub?: Subscription;

  constructor(private auth: AuthService) {
  }

  public logout(): void {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.auth.isLoginIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn);
  }
}
