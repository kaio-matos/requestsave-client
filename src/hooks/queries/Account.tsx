import { useMutation, UseMutationOptions } from 'react-query'

// Api
import { Account } from '@api/Account'

// Types
import { AccountInterface } from '@type/models/Account'
import { loginParamsBodyI } from '@type/Requests/AccountAPI'
import { APIErrorI } from '@type/API'
import { ResponseInterface } from '@type/ResponseType'

const QUERY_NAME = 'accounts'

export function useAccountQueryLogin(
  options: UseMutationOptions<
    ResponseInterface<AccountInterface>,
    APIErrorI,
    loginParamsBodyI,
    unknown
  >
) {
  return useMutation(Account.login, options)
}

export function useAccountQueryEdit(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.editDocument, options)
}

export function useAccountQueryRegister(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.register, options)
}

export function useAccountQueryResendRegisterEmail(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.resendRegisterEmail, options)
}

export function useAccountQueryConfirmRegistration(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.confirmRegistration, options)
}

export function useAccountQueryForgetPassword(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.forgetPasswordEmail, options)
}

export function useAccountQueryForgetResetPassword(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.forgetResetpassword, options)
}
