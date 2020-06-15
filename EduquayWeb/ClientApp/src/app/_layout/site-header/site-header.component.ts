import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  isPageLoaded: boolean;
  today: number = Date.now();

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    setInterval(() => { this.today = Date.now() }, 1);
    this.isPageLoaded = true;
  }

  logout() {
    this.tokenService.deleteToken('currentUser');
    this.router.navigate(['/login']);
  }

}
