import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { user } from 'src/app/shared/auth-response';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  isPageLoaded: boolean;
  today: number = Date.now();
  langualgeSelected: string;
  user: user;
  userName: string;
  userId: string;


  constructor(
    private tokenService: TokenService, 
    private router: Router, 
    public translate: TranslateService) {
    //https://www.positronx.io/angular-internationalization-i18n-with-ngx-translate-tutorial/
    translate.addLangs(['English', 'ଓଡିଆ', 'தமிழ்', 'हिन्दी']);
    translate.setDefaultLang('English');
    this.translate.use('English');
   }

  ngOnInit() {
    setInterval(() => { this.today = Date.now() }, 1);
    this.isPageLoaded = true;
    this.getLoggedUser();
  }

  getLoggedUser(){
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.userName = `${this.user.firstName} ${this.user.lastName}`;
  }

  logout() {
    this.tokenService.deleteToken('currentUser');
    this.router.navigate(['/login']);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
}
