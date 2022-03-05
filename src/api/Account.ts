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
   *
   * Login do usuário
   *
   * `login`: Envia o email e senha e recebe o Cookie JWT para usar nas próximas requisições, com validade de 1h
   *
   */

  async login(body: loginParamsBodyI) {
    const response = await API.post<ResponseInterface<AccountInterface>>(
      API_routes.account.login,
      body
    )
    return response.data
  }

  /**
   *
   * Registro de usuário e confirmação de email
   *
   * `sendEmail`: Envia o email com um botão de confirmação,
   *              que levará à uma pagina que em sua URL possui os parâmetros
   *              que serão enviados ao servidor
   *
   * `resendEmail`: Envia o novamente o email de confirmação
   *
   * `confirmEmail`: Recebe os parâmetos passados pela URL do botão confirmar email
   *
   */

  public Register = {
    async sendEmail(body: registerParamsBodyI) {
      const response = await API.post<ResponseInterface<boolean>>(API_routes.account.register, body)
      return response.data
    },

    async resendEmail(body: resendRegisterEmailParamsBodyI) {
      const response = await API.post<ResponseInterface<boolean>>(
        API_routes.account.resendRegisterConfirmation,
        body
      )
      return response.data
    },

    async confirmEmail(body: confirmeRegistrationParmamsBodyI) {
      const response = await API.get<ResponseInterface<boolean>>(
        API_routes.account.confirmRegistration,
        { params: body ? { ...body } : {} }
      )
      return response.data
    },
  }

  /**
   *
   * Controle da conta do próprio usuário, necessário da autenticação por Cookie.
   *
   * `logout`: Envia uma requisição sem Body apenas para checar o Cookie JWT
   *
   * `edit`: Pode receber valores para alteração de dados da conta
   *
   * `resetPassword`: Permite a alteração da senha apenas com o email e senha
   *
   * `delete`: Deleta a conta do usuário
   *
   * `checkJWT`: Envia uma requisição sem Body apenas para checar o Cookie JWT
   *
   */

  public Auth = {
    async logout() {
      const response = await API.post<ResponseInterface<boolean>>(API_routes.account.logout)
      return response.data
    },

    async edit(body: unknown) {
      const response = await API.put<ResponseInterface<boolean>>(API_routes.account.edit, body)
      return response.data
    },

    async resetPassword(body: resetPasswordBodyI) {
      const response = await API.post<ResponseInterface<boolean>>(
        API_routes.account.resetpassword,
        body
      )
      return response.data
    },

    async delete() {
      const response = await API.delete<ResponseInterface<boolean>>(API_routes.account.delete)
      return response.data
    },

    async checkJWT() {
      const response = await API.post<ResponseInterface<boolean>>(API_routes.account.checkJWT)
      return response.data
    },
  }

  /**
   *
   * Esqueci minha senha e reset de senha:
   *
   * `sendEmail`: Envia um email com um código
   *
   * `reset`: Com o código é possível fazer a alteração de senha
   *
   */

  public ForgetPassword = {
    async sendEmail(body: { email: string }) {
      const response = await API.post<ResponseInterface<boolean>>(API_routes.account.forget, body)
      return response.data
    },

    async reset(body: { email: string; token: string; password: string }) {
      const response = await API.post<ResponseInterface<boolean>>(
        API_routes.account.forgetResetpassword,
        body
      )
      return response.data
    },
  }
}
const Account = new AccountClass()

export { Account }
