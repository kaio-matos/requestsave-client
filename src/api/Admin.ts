import { ResponseGetPagesInterface, ResponseInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { API } from '@services/API'

// Types
import { AccountTieGetInterface, AccountTieInterface } from '@type/models/AccountTie'
import { UserGetInterface } from '@type/models/Account'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

class AdminClass {
  /**
   *
   * Gerenciamento de usuários
   *
   * `edit`: Envia os dados para alterar o vínculo ou o cargo do usuário
   *
   * `delete`: Deleta a conta de um usuário (e tudo que está associado a ele) baseado no ID enviado
   *
   * `get`: Recebe um array com todos os usuários de forma paginada e filtrado pelo search
   *
   */
  User = {
    route: API_routes.admin.user,

    async edit({ id, ...body }: APIeditDocumentI) {
      const response = await API.put<ResponseInterface<boolean>>(
        `${API_routes.admin.user}/${id}`,
        body
      )
      return response.data
    },

    async delete({ id }: { id: string | number }) {
      const response = await API.delete<ResponseInterface<boolean>>(
        `${API_routes.admin.user}/${id}`
      )
      return response.data
    },

    async get(pagination?: useQueryGetPaginationType, search = '') {
      const response = await API.get<ResponseGetPagesInterface<UserGetInterface[]>>(
        API_routes.admin.user,
        {
          params: { ...pagination, search },
        }
      )
      return response.data.data
    },
  }

  /**
   *
   * Gerenciamento de vínculos
   *
   * `create`: Cria um vínculo com nenhum usuário ligado a ele
   *
   * `edit`: Envia os dados para alterar valor do vínculo
   *
   * `delete`: Deleta a um vínculo (e tudo  que está associado a ele) baseado no ID enviado
   *
   * `get`: Recebe um array com os vínculos e com suas contas de forma paginada e filtrado pelo search
   *
   */
  AccountTie = {
    route: API_routes.admin.accountTie,

    async create(body: unknown) {
      const response = await API.post<ResponseInterface<AccountTieInterface>>(
        API_routes.admin.accountTie,
        body
      )
      return response.data
    },
    async edit({ id, ...body }: APIeditDocumentI) {
      const response = await API.put<ResponseInterface<boolean>>(
        `${API_routes.admin.accountTie}/${id}`,
        body
      )
      return response.data
    },
    async delete({ id }: { id: string | number }) {
      const response = await API.delete<ResponseInterface<boolean>>(
        `${API_routes.admin.accountTie}/${id}`
      )
      return response.data
    },
    async get(pagination?: useQueryGetPaginationType, search = '') {
      const response = await API.get<ResponseGetPagesInterface<AccountTieGetInterface[]>>(
        API_routes.admin.accountTie,
        { params: { ...pagination, search } }
      )
      return response.data.data
    },
  }
}

const Admin = new AdminClass()
export { Admin }
