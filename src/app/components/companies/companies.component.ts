import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'logo'];
  dataSource: any;

  constructor(private _auth: AuthService) {
    this.getCompanies();
  }

  ngOnInit(): void {}

  getCompanies() {
    this._auth.getCompanies().subscribe((companies) => {
      this.dataSource = companies;
    });
  }
}
