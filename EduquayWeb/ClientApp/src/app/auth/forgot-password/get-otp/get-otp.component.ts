import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ForgotPasswordRequest } from 'src/app/shared/login/forgot-password/forgot-password-request';
import { ForgotPasswordResponse } from 'src/app/shared/login/forgot-password/forgot-password-response';
import { ForgotPasswordService } from 'src/app/shared/login/forgot-password/forgot-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.css']
})
export class GetOtpComponent implements OnInit {

  sendotpRequest: ForgotPasswordRequest;
  sendotpResponse: ForgotPasswordResponse;
  resetEmailInput: string;
  forgotpasswordErrorMessage: string;


  constructor(
    private forgotpasswordservice: ForgotPasswordService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  onSubmit(resetLoginForm: NgForm){
    this.forgotpasswordErrorMessage = "";
    this.loaderService.display(true);
    console.log(resetLoginForm);
    this.resetEmailInput = resetLoginForm.value.userid;
    //this.resetpasswordInput = resetLoginForm.value.password;
    
    this.sendotpRequest = {
      userName:  this.resetEmailInput,
     
    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;
    let sendotp = this.forgotpasswordservice.sendotp(this.sendotpRequest)
      .subscribe(response => {
        this.sendotpResponse = response;
        this.loaderService.display(false);
        if (this.sendotpResponse !== null && this.sendotpResponse.status === "true") {
          this.showResponseMessage(this.sendotpResponse.message, 's');
        } 
        else {
          this.showResponseMessage(this.sendotpResponse.message, 'e');
          this.forgotpasswordErrorMessage = response.message;
        }

      },
      (err: HttpErrorResponse) =>{
        this.showResponseMessage(err.toString(), 'e');
        this.forgotpasswordErrorMessage = err.toString();
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
      // .then((result) => {
      //   if (result.value) {
      // if(this.modalService.hasOpenModals){
      //   this.modalService.dismissAll();
      //   this.resetloginlErrorMessage = "";
      //   window.location.reload();
      //   //this.router.navigateByUrl(`/home/login`);
      // }         
      //   }
      // });
    }
  }

}
