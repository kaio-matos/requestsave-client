import { ResponseGetPagesInterface, ResponseInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { ClientInterface } from '@type/models/Client'
import { API } from '@services/API'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

/**
 *
 * Gerenciamento de clientes
 *
 */
class ClientClass {
  route = API_routes.models.client

  /** Cria um cliente */
  async createDocument(body: unknown) {
    const response = await API.post<ResponseInterface<ClientInterface>>(
      API_routes.models.client,
      body
    )
    return response.data
  }

  /** Deleta um cliente com seu ID */
  async deleteDocument({ id }: { id: string | number }) {
    const response = await API.delete<ResponseInterface<boolean>>(
      `${API_routes.models.client}/${id}`
    )
    return response.data
  }

  /** Altera um cliente com seu ID */
  async editDocument({ id, ...body }: APIeditDocumentI) {
    const response = await API.put<ResponseInterface<boolean>>(
      `${API_routes.models.client}/${id}`,
      body
    )
    return response.data
  }

  /** Recebe um array com todos os clientes de forma paginada e filtrado pelo search */
  async getDocument(pagination?: useQueryGetPaginationType, search = '') {
    const response = await API.get<ResponseGetPagesInterface<ClientInterface[]>>(
      API_routes.models.client,
      {
        params: { ...pagination, search },
      }
    )
    return response.data.data
  }
}

const Client = new ClientClass()
export { Client }
