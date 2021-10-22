import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'country', 'phone'];
  dataSource: any;
  mobNumberPattern = '[0-9]{10}$';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(this.mobNumberPattern)]),
  });

  constructor(private _auth: AuthService) {
    this.getContacts();
  }

  ngOnInit(): void {}

  getContacts() {
    this._auth.getContacts().subscribe((contacts) => {
      this.dataSource = contacts;
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.dataSource.push(this.form.value);
      console.log(this.dataSource);
    }
  }
}
