import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(private _auth: AuthService) {}

  ngDoCheck() {
    this.isLoggedIn = this._auth.isLoggedIn();
  }

  ngOnInit(): void {}

  logout() {
    this._auth.logout();
    this.isLoggedIn = this._auth.isLoggedIn();
  }
}
