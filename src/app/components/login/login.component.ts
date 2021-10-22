import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: any;
  strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,16})'
  );

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(this.strongPassword),
    ]),
  });

  constructor(private _auth: AuthService, public _router: Router) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this._auth.login(this.form.value).subscribe((user) => {
        console.log(user);
        if (localStorage.getItem('access_token')) {
          // this.form.reset();
          this._router.navigate(['/companies']);
        }
      });
    }
  }
}
