import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { user, authResponse } from 'src/app/shared/auth-response';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { GenericService } from 'src/app/shared/generic.service';
import { ENDPOINT } from '../../app.constant';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { CookieService } from 'ngx-cookie-service';

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
  authResult: authResponse;
  private cookieValue: string;


  constructor(
    private tokenService: TokenService, 
    authService: AuthService,
    private route: ActivatedRoute,
    private router: Router, 
    private httpClient: HttpClient, 
    private httpClientService:HttpClientService,
    private genericService: GenericService,
    private cookieService: CookieService,
    public translate: TranslateService) {
    //https://www.positronx.io/angular-internationalization-i18n-with-ngx-translate-tutorial/
    translate.addLangs(['English', 'ଓଡିଆ']); //, 'தமிழ்', 'हिन्दी'
    translate.setDefaultLang('English');
    this.translate.use('English');
   
   }

  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    setInterval(() => { this.today = Date.now() }, 1);
    this.isPageLoaded = true;
    this.getLoggedUser();
    // this.cookieService.set('cookieApp', 'Welcome you, Anil!' );
    // //Get Cookies
    // this.cookieValue = this.cookieService.get('cookieApp');
  }

  getLoggedUser(){
    this.user = JSON.parse(this.tokenService.getUser('lu'));
    this.userName = `${this.user.firstName} ${this.user.lastName}`;
    
  }

  // logout() {

  //   this.tokenService.deleteToken('currentUser');
  //   this.router.navigate(['/login']);
  
  // }
 
  // pologout(userId){
  //   var user = JSON.parse(this.tokenService.getUser('lu'));
  //   this.userId = user.id;
  //   const logoutApi: string = 'api/v1/User/Logout';
  //   let logoutUrl = this.genericService.buildApiUrl(`${logoutApi}/${userId}`);
  //   return this.httpClient.post(logoutUrl,this.tokenService.deleteToken('currentUser')
  //     );
  //     this.router.navigate(['/login'])

  // }
  logout(userId)
  {
    var user = JSON.parse(this.tokenService.getUser('lu'));
    var _userLogoutObj = {
      "userId":this.user.id,     
    }
    const logoutApi: string = 'api/v1/User/Logout';
    var apiUrl = this.genericService.buildApiUrl(`${logoutApi}/${user.id}`);
        this.httpClientService.post<any>({url:apiUrl, body: _userLogoutObj }).subscribe(response => {
          console.log(response);
         this.tokenService.clearToken();
         localStorage.clear();
         this.tokenService.deleteToken('currentUser');
          // this.cookieService.delete('cookieApp');
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) =>{
          console.log(err);
        });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
}
