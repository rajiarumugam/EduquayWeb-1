import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  isPageLoaded: boolean;
  today: number = Date.now();
  langualgeSelected: string;

  constructor(
    private tokenService: TokenService, 
    private router: Router, 
    public translate: TranslateService) {
    //https://www.positronx.io/angular-internationalization-i18n-with-ngx-translate-tutorial/
    translate.addLangs(['English', 'ଓଡିଆ', 'தமிழ்', 'हिन्दी']);
    translate.setDefaultLang('Englishn');
    this.translate.use('English');
   }

  ngOnInit() {
    setInterval(() => { this.today = Date.now() }, 1);
    this.isPageLoaded = true;
  }

  logout() {
    this.tokenService.deleteToken('currentUser');
    this.router.navigate(['/login']);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
}
