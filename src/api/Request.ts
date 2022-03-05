import { ResponseInterface, ResponseGetPagesInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { RequestType } from '@type/models/Request'
import { API } from '@services/API'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

/**
 *
 * Gerenciamento de pedidos
 *
 */
class RequestClass {
  route = API_routes.models.request

  /** Cria um pedido  */
  async createDocument(body: unknown) {
    const response = await API.post<ResponseInterface<RequestType>>(API_routes.models.request, body)
    return response.data
  }

  /** Deleta um pedido com seu ID */
  async deleteDocument({ id }: { id: string | number }) {
    const response = await API.delete<ResponseInterface<boolean>>(
      `${API_routes.models.request}/${id}`
    )
    return response.data
  }

  /** Altera um pedido com seu ID */
  async editDocument({ id, ...body }: APIeditDocumentI) {
    const response = await API.put<ResponseInterface<boolean>>(
      `${API_routes.models.request}/${id}`,
      body
    )
    return response.data
  }

  /** Recebe um array com todos os pedidos de forma paginada e filtrado pelo search */
  async getDocument(pagination: useQueryGetPaginationType, search = '') {
    const response = await API.get<ResponseGetPagesInterface<RequestType[]>>(
      API_routes.models.request,
      {
        params: { ...pagination, search },
      }
    )

    return response.data.data
  }
}

const Request = new RequestClass()
export { Request }
