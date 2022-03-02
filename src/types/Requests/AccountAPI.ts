export interface registerParamsBodyI {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface loginParamsBodyI {
  email: string
  password: string
}

export interface resendRegisterEmailParamsBodyI {
  email: string
}

export interface resetPasswordBodyI {
  email: string
  password: string
}

export interface confirmeRegistrationParmamsBodyI {
  email: string | null
  token: string | null
}

export interface RegisterFormI {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
}

export interface resendRegisterEmailFormI {
  email: string
}

export interface confirmRegistrationValidationI {
  email: string | null
  token: string | null
}

export interface forgetPasswordEmailValidationI {
  email: string
}


export interface forgetResetpasswordValidationI {
  email: string
  code: string
  password: string,
  confirmPassword: string
}
