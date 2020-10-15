import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequest } from 'src/app/shared/auth-request';
import { authResponse, resetLoginResponse } from 'src/app/shared/auth-response';
import { AuthService } from 'src/app/shared/auth.service';
import { GenericService } from 'src/app/shared/generic.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-login',
  templateUrl: './reset-login.component.html',
  styleUrls: ['./reset-login.component.css']
})
export class ResetLoginComponent implements OnInit {

  loginCaption: string = "Submit";
  loginProcess: string = "Processing..";
  loginStatus: string = this.loginCaption;
  authResult: authResponse;
  isLoginError: boolean = false;
  resetLoginResquest: AuthRequest;
  resetLoginResponse: resetLoginResponse;
  loginErrorMessage: string;
  ngDisabled: string;
  isProcessing: boolean = false;
  textPassword: string;
  isPassword: boolean = true;
  resetloginlErrorMessage: string;
  resetEmailInput: string;
  resetpasswordInput: string;

  constructor(
    private tokenService: TokenService, 
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private httpClientService:HttpClientService,
    private genericService: GenericService
  ) { }

  ngOnInit() {
  }

  showPassword(){
    this.isPassword = true;
    if(this.textPassword) this.isPassword = false;

  }

  onSubmit(resetLoginForm: NgForm){
    this.resetloginlErrorMessage = "";
    console.log(resetLoginForm);
    this.resetEmailInput = resetLoginForm.value.userid;
    this.resetpasswordInput = resetLoginForm.value.password;
    
    this.resetLoginResquest = {
      userName:  this.resetEmailInput,
      password: this.resetpasswordInput,
     
    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;
    let adddamagedsample = this.authService.resetLoginFunc(this.resetLoginResquest)
      .subscribe(response => {
        this.resetLoginResponse = response;
        if (this.resetLoginResponse !== null && this.resetLoginResponse.success === true) {
          this.showResponseMessage(this.resetLoginResponse.message, 's');
        } 
        else {
          this.showResponseMessage(this.resetLoginResponse.message, 'e');
          this.resetloginlErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) =>{
        this.showResponseMessage(err.toString(), 'e');
        this.resetloginlErrorMessage = err.toString();
        console.log(err);
      });

  }

  showResponseMessage(message: string, type: string){
    var messageType = '';
    if(type === 'e'){
      Swal.fire({icon:'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false});
    }
    else if(type === 'i'){
      Swal.fire({icon:'info', title: message, confirmButtonText: 'Close', allowOutsideClick: false});
    }
    else if(type === 's'){
      Swal.fire({icon:'success', title: message, confirmButtonText: 'Close', allowOutsideClick: false})
      .then((result) => {
        if (result.value) {
          this.router.navigateByUrl(`home/login`);
        }
      });
    }
  }

}
