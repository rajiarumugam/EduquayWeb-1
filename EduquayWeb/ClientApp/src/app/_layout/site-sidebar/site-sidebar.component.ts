import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from 'src/app/shared/token.service';
import { user, authResponse } from 'src/app/shared/auth-response';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-site-sidebar',
  templateUrl: './site-sidebar.component.html',
  styleUrls: ['./site-sidebar.component.css']
})
export class SiteSidebarComponent implements OnInit {
  @Input() module: string;
  @Input() subMenu: string;

  user: user;
  authResult: authResponse;

  userRole: string;

 
  constructor(
    private tokenService: TokenService,
    authService: AuthService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenService.getUser('lu')); 
    console.log(this.user)
  }

}
