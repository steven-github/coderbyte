import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { catchError, map, filter } from 'rxjs/operators';

const AUTH_API =
  'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, public _router: Router) {}

  login(form: User): Observable<any> {
    return this._http.get<any>(AUTH_API + 'users').pipe(
      map((users) =>
        users.filter((user: User) => {
          if (user.email == form.email) {
            localStorage.setItem(
              'access_token',
              user.firstName + '-' + user.lastName
            );
          }
          return user.email == form.email;
        })
      )
    );
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this._router.navigate(['/login']);
    }
  }

  getCompanies(): Observable<any> {
    return this._http.get<any>(AUTH_API + 'companies');
  }

  getContacts(): Observable<any> {
    return this._http.get<any>(AUTH_API + 'contacts');
  }
}
