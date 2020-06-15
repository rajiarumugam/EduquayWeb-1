import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authResponse } from '../../shared/auth-response';
import { TokenService } from '../../shared/token.service';
import { AuthService } from '../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: false }) loginForm: NgForm;
  loginCaption: string = "Submit";
  loginProcess: string = "Processing..";
  loginStatus: string = this.loginCaption;
  authResult: authResponse;
  isLoginError: boolean = false;
  loginErrorMessage: string;
  ngDisabled: string;
  isProcessing: boolean = false;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let patientResponse = {};
    let patients = [];
  }

  userLogin() {
    this.loginStatus = this.loginProcess;
    this.ngDisabled = "disabled";
    this.isProcessing = true;
    console.log(this.loginForm);
    let emailInput = this.loginForm.value.email;
    let passwordInput = this.loginForm.value.password;
    let authRespose = this.authService.userAuthentication(emailInput, passwordInput)
      .subscribe(response => {
        this.authResult = response;
        console.log(response);
        if (this.authResult && (this.authResult.status)) {
          this.tokenService.setToken('currentUser', this.authResult.token, 'somename');
          this.router.navigate(['/app'], { relativeTo: this.route });
        } else if ((this.authResult && (!this.authResult.status))) {
          this.isLoginError = true;
          this.loginErrorMessage = this.authResult.errors[0];
          this.loginprocess(false);
        } else {
          this.isLoginError = true;
          this.loginErrorMessage = "Invalid request...";
          this.loginprocess(false);
        }
      },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
          this.loginErrorMessage = err.toString();
          this.loginprocess(false);
        });
  }

  onSubmit() {
    console.log(this.loginForm);
    console.log(this.loginForm.value.email);
  }

  loginprocess(status){
    this.loginStatus = this.loginCaption;
    this.ngDisabled = "";
    this.isProcessing = status;
  }
}
