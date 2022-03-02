import { ResponseGetPagesInterface, ResponseInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { ClientInterface } from '@type/models/Client'
import { API } from '@services/API'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

class ClientClass {
  action = API_routes.models.client

  async createDocument(body: unknown) {
    const response = await API.post<ResponseInterface<ClientInterface>>(
      API_routes.models.client,
      body
    )
    return response.data
  }

  async deleteDocument({ id }: { id: string | number }) {
    const response = await API.delete<ResponseInterface<boolean>>(
      `${API_routes.models.client}/${id}`
    )
    return response.data
  }

  async editDocument({ id, ...body }: APIeditDocumentI) {
    const response = await API.put<ResponseInterface<boolean>>(
      `${API_routes.models.client}/${id}`,
      body
    )
    return response.data
  }

  async getDocument(pagination?: useQueryGetPaginationType, search = '') {
    const response = await API.get<ResponseGetPagesInterface<ClientInterface[]>>(
      API_routes.models.client,
      { params: { ...pagination, search } }
    )
    return response.data.data
  }
}

const Client = new ClientClass()
export { Client }
