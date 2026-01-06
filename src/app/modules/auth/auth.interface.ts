// interface for signup input data used in auth module

export interface ISignupData {
    name: string;
    dob: string;
    password: string;
    email: string;
}

// interface for login input data used in auth module
export interface ISigninData {
  email: string;
  password: string;
}

// interface for reset password input data used in auth module
export interface IResetPasswordData {
  email: string;
}

// interface for forgot password input data used in auth module
export interface IForgotPasswordData {
  password: string;
  confirmPassword: string;
}   

// interface for token data used in auth module
export interface ITokenData {
  userId: string;
  iat: number;
  exp: number;
}

// interface for auth response data used in auth module
export interface IAuthResponse {
  token: string;
  userId: string;
}

