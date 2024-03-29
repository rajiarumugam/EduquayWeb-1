import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authResponse, resetLoginResponse } from '../../shared/auth-response';
import { TokenService } from '../../shared/token.service';
import { AuthService } from '../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GenericService } from 'src/app/shared/generic.service';
import { AuthRequest } from 'src/app/shared/auth-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-hplclogin',
  templateUrl: './hplclogin.component.html',
  styleUrls: ['./hplclogin.component.css']
})
export class HplcLoginComponent implements OnInit {
  @ViewChild('f', { static: false }) loginForm: NgForm;
  //@ViewChild('t', { static: false }) resetLoginForm: NgForm;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;

  
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
      private modalService: NgbModal,
      private route: ActivatedRoute,
      private el: ElementRef,
      private httpClientService:HttpClientService,
      private genericService: GenericService,
      private dataservice: DataService,
    ) { }

  ngOnInit() {
    console.log(Date.now)

 //  this.openModal()

    let patientResponse = {};
    let patients = [];
  }

  userLogin() {
    this.loginStatus = this.loginProcess;
    this.ngDisabled = "disabled";
    this.isProcessing = true;
    console.log(this.loginForm);
    let emailInput = this.loginForm.value.userid;
    let passwordInput = this.loginForm.value.password;
    let authRespose = this.authService.userAuthentication(emailInput, passwordInput)
      .subscribe(response => {
        this.authResult = response;
        console.log(response);
       
        if (this.authResult && (this.authResult.status)) {
          this.tokenService.setToken('currentUser', this.authResult.token, 'somename');
          this.tokenService.setUser('lu', this.authResult.userDetail);
          console.log(this.authResult.userDetail);

          this.dataservice.deleteProp('csvspecimenstartdata');
         

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

  // onSubmit() {
  //   console.log(this.loginForm);
  //   console.log(this.loginForm.value.userid);
  // }

  loginprocess(status){
    this.loginStatus = this.loginCaption;
    this.ngDisabled = "";
    this.isProcessing = status;
  }

  openResetLogin(resetloginDetails){

    this.resetEmailInput = '';
    this.resetpasswordInput = '';

    this.modalService.open(
      resetloginDetails,{
        centered: true,
        size: 'md',
        scrollable: true,
         backdrop:'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title'
      });
  }

  showPassword(){
    this.isPassword = true;
    if(this.textPassword) this.isPassword = false;

  }

  forgotPassword(){
    this.showResponseMessage('Please contact administrator to reset your password', 'i');
  }

  onSubmit(resetLoginForm: NgForm){
    this.resetloginlErrorMessage = "";
    console.log(resetLoginForm);
    this.resetEmailInput = resetLoginForm.value.userid;
    this.resetpasswordInput = resetLoginForm.value.password;
    
    var _hplcLoginForm = {
      usd:  this.resetEmailInput,
      barcode: this.resetpasswordInput,
     
    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;
    let adddamagedsample = this.authService.hplcLoginFunc(_hplcLoginForm)
      .subscribe(response => {
        this.resetLoginResponse = response;
        if (response !== null && response.status === "1") {
         // this.showResponseMessage(this.resetLoginResponse.message, 's');
          sessionStorage.setItem("hplcuserDetails", JSON.stringify(_hplcLoginForm));
          this.router.navigate(['/hplc-report-print']);
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
  openModal(){
    this.modalService.open(this.content, { centered: true ,size:"10",backdrop:"static"});
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
      if(this.modalService.hasOpenModals){
        this.modalService.dismissAll();
        this.resetloginlErrorMessage = "";
        //window.location.reload();
        //this.router.navigateByUrl(`/home/login`);
      }         
        }
      });
    }
  }
  
}
