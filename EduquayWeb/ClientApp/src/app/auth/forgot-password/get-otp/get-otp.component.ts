import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ForgotPasswordRequest, resetPasswordRequest, ValidateOTPRequest } from 'src/app/shared/login/forgot-password/forgot-password-request';
import { ForgotPasswordResponse, resetPasswordResponse, ValidateOTPResponse } from 'src/app/shared/login/forgot-password/forgot-password-response';
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
  validateotpRequest: ValidateOTPRequest;
  validateotpResponse: ValidateOTPResponse;
  resetpasswordRequest: resetPasswordRequest;
  resetpasswordResponse: resetPasswordResponse;
  resetEmailInput: string;
  forgotpasswordErrorMessage: string;
  isOtpSent: boolean = true;
  isGetOtp: boolean = false;
  getEmailInput: string;
  otpInputVal: string;
  isPasswordInput: boolean = false;
  resendotp: boolean = false;
  newpasswordval: string;
  confirmpasswordval: string;
  textPassword: string;
  isPassword: boolean = true;
  patternHign: any = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
  selectedNewPattern: string;
  selectedConfirmPattern: string;
  errorMgsNewPassword: string;
  errorMgsConfrimPassword: string;


  constructor(
    private forgotpasswordservice: ForgotPasswordService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(resetLoginForm: NgForm) {

    this.forgotpasswordErrorMessage = "";
    if (this.isOtpSent === true && this.isGetOtp === false && this.isPasswordInput === false) {
      this.loaderService.display(true);
      console.log(resetLoginForm);
      this.resetEmailInput = resetLoginForm.value.userid;
      //this.resetpasswordInput = resetLoginForm.value.password;
      if (this.resetEmailInput === '' || this.resetEmailInput === undefined) {
        this.showResponseMessage('Please fill out this field', 'e');
        this.loaderService.display(false);
        return false;
      }
      this.sendotpRequest = {
        userName: this.resetEmailInput,

      }

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
          (err: HttpErrorResponse) => {
            this.showResponseMessage(err.toString(), 'e');
            this.forgotpasswordErrorMessage = err.toString();
            console.log(err);
          });
    }

    else if (this.isOtpSent === false && this.isGetOtp === true && this.isPasswordInput === false) {
      console.log(resetLoginForm);
      this.getEmailInput = resetLoginForm.value.userid;
      this.otpInputVal = resetLoginForm.value.otpVal;
      if (this.otpInputVal === '' || this.otpInputVal == undefined) {
        this.validateOtpResponseMessage('Please enter the OTP', 'e');
        this.loaderService.display(false);
        return false;
      }
      this.loaderService.display(true);
      this.validateotpRequest = {
        userName: this.getEmailInput,
        otp: this.otpInputVal,

      }
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('Successfully registered', 's');
      // return false;
      let validateotp = this.forgotpasswordservice.validateotp(this.validateotpRequest)
        .subscribe(response => {
          this.validateotpResponse = response;
          this.loaderService.display(false);
          if (this.validateotpResponse !== null && this.validateotpResponse.status === "true") {
            this.validateOtpResponseMessage(this.validateotpResponse.message, 's');
          }
          else {
            this.validateOtpResponseMessage(this.validateotpResponse.message, 'e');
            this.forgotpasswordErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.validateOtpResponseMessage(err.toString(), 'e');
            this.forgotpasswordErrorMessage = err.toString();
            console.log(err);
          });

    }

    else if (this.isOtpSent === false && this.isGetOtp === false && this.isPasswordInput === true) {

      this.newpasswordval = '';
      this.confirmpasswordval = '';
      console.log(resetLoginForm);
      this.getEmailInput = resetLoginForm.value.userid;
      this.newpasswordval = resetLoginForm.value.newpassword;
      this.confirmpasswordval = resetLoginForm.value.confirmpassword;

      if (this.newpasswordval === '' || this.confirmpasswordval === '') {
        this.resetPasswordResponseMessage('Please fill out password field', 'e');
        return false;
      }

      if (this.newpasswordval != this.confirmpasswordval) {
        this.resetPasswordResponseMessage('New Password and Confirm Password must be match.', 'e');
        return false;
      }
      this.loaderService.display(true);
      this.resetpasswordRequest = {
        userName: this.getEmailInput,
        password: this.newpasswordval,

      }
      //Remove below 2 lines after successfully tested
      // this.showResponseMessage('testing', 's');
      // this.loaderService.display(false);
      // return false;
      let resetpassword = this.forgotpasswordservice.resetPassword(this.resetpasswordRequest)
        .subscribe(response => {
          this.resetpasswordResponse = response;
          this.loaderService.display(false);
          if (this.resetpasswordResponse !== null && this.resetpasswordResponse.status === "true") {
            this.resetPasswordResponseMessage(this.resetpasswordResponse.message, 's');
          }
          else {
            this.resetPasswordResponseMessage(this.resetpasswordResponse.message, 'e');
            this.forgotpasswordErrorMessage = response.message;
          }

        },
          (err: HttpErrorResponse) => {
            this.resetPasswordResponseMessage(err.toString(), 'e');
            this.forgotpasswordErrorMessage = err.toString();
            console.log(err);
          });
    }


  }

  showPassword(){
    this.isPassword = true;
    if(this.textPassword) this.isPassword = false;

  }

  resendOtp() {

    this.forgotpasswordErrorMessage = "";
    this.loaderService.display(true);
    // console.log(resetLoginForm);
    this.getEmailInput = this.resetEmailInput;
    //this.resetpasswordInput = resetLoginForm.value.password;

    this.sendotpRequest = {
      userName: this.getEmailInput,

    }

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
        (err: HttpErrorResponse) => {
          this.showResponseMessage(err.toString(), 'e');
          this.forgotpasswordErrorMessage = err.toString();
          console.log(err);
        });

  }

  validateOTP(resetLoginForm: NgForm) {

    this.forgotpasswordErrorMessage = "";
    this.loaderService.display(true);
    console.log(resetLoginForm);
    this.getEmailInput = resetLoginForm.value.userid;
    this.otpInputVal = resetLoginForm.value.otpVal;
    if (this.otpInputVal === '' || this.otpInputVal == undefined) {
      this.validateOtpResponseMessage('Please enter the OTP', 'e');
    }
    this.validateotpRequest = {
      userName: this.getEmailInput,
      otp: this.otpInputVal,

    }
    //Remove below 2 lines after successfully tested
    // this.showResponseMessage('Successfully registered', 's');
    // return false;
    let validateotp = this.forgotpasswordservice.validateotp(this.validateotpRequest)
      .subscribe(response => {
        this.validateotpResponse = response;
        this.loaderService.display(false);
        if (this.validateotpResponse !== null && this.validateotpResponse.status === "true") {
          this.validateOtpResponseMessage(this.validateotpResponse.message, 's');
        }
        else {
          this.validateOtpResponseMessage(this.validateotpResponse.message, 'e');
          this.forgotpasswordErrorMessage = response.message;
        }

      },
        (err: HttpErrorResponse) => {
          this.validateOtpResponseMessage(err.toString(), 'e');
          this.forgotpasswordErrorMessage = err.toString();
          console.log(err);
        });

  }

  showResponseMessage(message: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false });
    }
    else if (type === 'i') {
      Swal.fire({ icon: 'info', title: message, confirmButtonText: 'Close', allowOutsideClick: false });
    }
    else if (type === 's') {
      Swal.fire({ icon: 'success', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.isOtpSent = false;
            this.isGetOtp = true;
            this.isPasswordInput = false;
          }
        });
    }
  }

  validateOtpResponseMessage(message: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false });
    }
    else if (type === 's') {
      Swal.fire({ icon: 'success', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.isOtpSent = false;
            this.isGetOtp = false;
            this.isPasswordInput = true;
          }
        });
    }
  }

  resetPasswordResponseMessage(message: string, type: string) {
    var messageType = '';
    if (type === 'e') {
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'Close', allowOutsideClick: false });
    }
    else if (type === 's') {
      Swal.fire({ icon: 'success', title: message, confirmButtonText: 'Ok', allowOutsideClick: false })
        .then((result) => {
          if (result.value) {
            this.router.navigateByUrl(`home/login`);
          }
        });
    }
  }

}
