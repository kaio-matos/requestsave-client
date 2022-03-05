import { useMutation, UseMutationOptions } from 'react-query'

// Api
import { Account } from '@api/Account'

// Types
import { AccountInterface } from '@type/models/Account'
import { loginParamsBodyI } from '@type/Requests/AccountAPI'
import { APIErrorI } from '@type/API'
import { ResponseInterface } from '@type/ResponseType'

const QUERY_NAME = 'accounts'

// Login
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

/**
 *
 *
 * Controle de conta
 *
 *
 */

/** Pode receber valores para alteração de dados da conta */
export function useAccountQueryEdit(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.Auth.edit, options)
}
/**
 *
 *
 * Registro de usuário e confirmação de email
 *
 *
 */

/**
 * Envia o email com um botão de confirmação, que levará à uma pagina
 * que em sua URL possui os parâmetros que serão enviados ao servidor
 */

export function useAccountQueryRegister(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.Register.sendEmail, options)
}

/** Envia o novamente o email de confirmação */
export function useAccountQueryResendRegisterEmail(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.Register.resendEmail, options)
}

/** Recebe os parâmetos passados pela URL do botão confirmar email */
export function useAccountQueryConfirmRegistration(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.Register.confirmEmail, options)
}

/**
 *
 *
 * Esqueci minha senha e reset de senha
 *
 *
 */

/** Envia um email com um código */
export function useAccountQueryForgetPassword(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.ForgetPassword.sendEmail, options)
}

/** Com o código é possível fazer a alteração de senha */
export function useAccountQueryForgetResetPassword(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, unknown, unknown>
) {
  return useMutation(Account.ForgetPassword.reset, options)
}
