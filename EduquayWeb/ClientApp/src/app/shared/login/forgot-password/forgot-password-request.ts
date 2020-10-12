export interface ForgotPasswordRequest {
    userName: string;
    otp?: string; 
}

export interface ValidateOTPRequest {
    userName: string;
    otp: string; 
}

export interface resetPasswordRequest {
    userName: string;
    password: string; 
}
