import { API } from '@services/API'
import { ResponseInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { AccountInterface } from '@type/models/Account'
import {
  confirmeRegistrationParmamsBodyI,
  loginParamsBodyI,
  registerParamsBodyI,
  resendRegisterEmailParamsBodyI,
  resetPasswordBodyI,
} from '@type/Requests/AccountAPI'

class AccountClass {
  /**
   * Antes do login
   */
  async login(body: loginParamsBodyI) {
    const response = await API.post<ResponseInterface<AccountInterface>>(
      API_routes.account.login,
      body
    )
    return response.data
  }

  async forgetPasswordEmail(body: unknown) {
    const response = await API.post<ResponseInterface<boolean>>(API_routes.account.forget, body)
    return response.data
  }

  async forgetResetpassword(body: { email: string; token: string; password: string }) {
    const response = await API.post<ResponseInterface<boolean>>(
      API_routes.account.forgetResetpassword,
      body
    )
    return response.data
  }

  async resetPassword(body: resetPasswordBodyI) {
    const response = await API.post<ResponseInterface<boolean>>(
      API_routes.account.resetpassword,
      body
    )
    return response.data
  }

  /**
   * Parte de registro
   */
  async register(body: registerParamsBodyI) {
    const response = await API.post<ResponseInterface<boolean>>(API_routes.account.register, body)
    return response.data
  }

  async confirmRegistration(body: confirmeRegistrationParmamsBodyI) {
    const response = await API.get<ResponseInterface<boolean>>(
      API_routes.account.confirmRegistration,
      { params: body ? { ...body } : {} }
    )
    return response.data
  }

  async resendRegisterEmail(body: resendRegisterEmailParamsBodyI) {
    const response = await API.post<ResponseInterface<boolean>>(
      API_routes.account.resendRegisterConfirmation,
      body
    )
    return response.data
  }

  /**
   * Controle de conta
   */
  async delete() {
    const response = await API.delete<ResponseInterface<boolean>>(API_routes.account.delete)
    return response.data
  }

  async editDocument(body: unknown) {
    const response = await API.put<ResponseInterface<boolean>>(API_routes.account.edit, body)
    return response.data
  }
  async logout() {
    const response = await API.post<ResponseInterface<boolean>>(API_routes.account.logout)
    return response.data
  }

  async checkJWT() {
    const response = await API.post<ResponseInterface<boolean>>(API_routes.account.checkJWT)
    return response.data
  }
}
const Account = new AccountClass()

export { Account }
