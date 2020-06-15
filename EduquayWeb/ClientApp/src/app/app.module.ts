import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule, RoutingComponents } from './app.routing.module';

import { AuthInterceptorServiceService } from './interceptors/auth-interceptor-service';
import { HttpErrorInterceptor } from './interceptors/httpErrorInterceptor';
import { AuthGuard } from './shared/auth.guard';
import { CommonService } from './shared/common.service';
import { ConstantService } from './shared/constant.service';
import { GenericService } from './shared/generic.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RoutingComponents,

    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    AuthGuard,
    CommonService,
    ConstantService,
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
