import { ResponseGetPagesInterface, ResponseInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { API } from '@services/API'

// Types
import { AccountTieGetInterface, AccountTieInterface } from '@type/models/AccountTie'
import { UserGetInterface } from '@type/models/Account'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

class AdminClass {
  User = {
    async editRole(body: APIeditDocumentI) {
      const response = await API.put<ResponseInterface<boolean>>(API_routes.admin.user, body)
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
        { params: { ...pagination, search } }
      )
      return response.data.data
    },
  }

  AccountTie = {
    async create(body: unknown) {
      const response = await API.post<ResponseInterface<AccountTieInterface>>(
        API_routes.admin.accountTie,
        body
      )
      return response.data
    },
    async edit(body: unknown) {
      const response = await API.put<ResponseInterface<boolean>>(API_routes.admin.accountTie, body)
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
