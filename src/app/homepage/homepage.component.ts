import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  username!: string | null;
  constructor(private loginService: AuthService, private router: Router) {}

  async ngOnInit() {
    await this.loginService.getUsername();
    this.username = localStorage.getItem('name');
    console.log(this.username);
  }

  async logout() {
    await this.loginService.logout();
  }
}
