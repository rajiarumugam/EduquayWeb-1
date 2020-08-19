import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { user, authResponse } from 'src/app/shared/auth-response';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { GenericService } from 'src/app/shared/generic.service';
import { ENDPOINT } from '../../app.constant';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';
import { map, mergeMap } from 'rxjs/internal/operators';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  subscription: Subscription;
  isPageLoaded: boolean;
  today: number = Date.now();
  langualgeSelected: string;
  user: user;
  userName: string;
  userId: string;
  authResult: authResponse;
  module: string;
  submodule: string;
  componentpage: string;
  componentpagealter: string;
  private cookieValue: string;

  breadcrumbs;

  constructor(
    private tokenService: TokenService, 
    authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private httpClient: HttpClient, 
    private httpClientService:HttpClientService,
    private genericService: GenericService,
    private cookieService: CookieService,
    public translate: TranslateService,
    private dataService: DataService) {
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
   
    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .pipe(map(() => this.activatedRoute))
    // .pipe(map((route) => {
    //   while (route.firstChild) { route = route.firstChild; }
    //   return route;
    // }))
    // .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
    // .subscribe(route => {

    //   let snapshot = this.router.routerState.snapshot;
    //   this.breadcrumbs = [];
    //   let url = snapshot.url;
    //   let routeData = route.snapshot.data;

    //   console.log(routeData);
    //   let label = routeData['breadcrumb'];
    //   let params = snapshot.root.params;

    //   this.breadcrumbs.push({
    //     url: url,
    //     label: label,
    //     params: params
    //   });

    // });
    
    this.receiveBreadcrum();


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
  
  receiveBreadcrum(){
    this.subscription = this.dataService.receiveData().subscribe(message => {
      if(JSON.parse(message).module !== undefined && JSON.parse(message).module !== ''){
        this.module = JSON.parse(message).module;
      }
      else{
        this.module = '';
      } 
      if(JSON.parse(message).submodule !== undefined && JSON.parse(message).submodule !== ''){
        this.submodule = JSON.parse(message).submodule;
      }
      else{
        this.submodule = '';
      }
      if(JSON.parse(message).page !== undefined && JSON.parse(message).page !== ''){
        this.componentpage = JSON.parse(message).page;
      }
      else{
        this.componentpage = '';
      }

      if(JSON.parse(message).pagealter !== undefined && JSON.parse(message).pagealter !== ''){
        this.componentpagealter = JSON.parse(message).pagealter;
      }
      else{
        this.componentpagealter = '';
      }
      if(this.componentpagealter !== ''){
        this.componentpage = this.componentpagealter;
      }
    });
  }
}
