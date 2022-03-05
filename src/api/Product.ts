import { ResponseGetPagesInterface, ResponseInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { API } from '@services/API'
import { ProductInterface } from '@type/models/Product'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

/**
 *
 * Gerenciamento de produtos
 *
 */
class ProductClass {
  route = API_routes.models.product

  /** Cria um produto  */
  async createDocument(body: unknown) {
    const response = await API.post<ResponseInterface<ProductInterface>>(
      API_routes.models.product,
      body
    )
    return response.data
  }

  /** Deleta um produto com seu ID */
  async deleteDocument({ id }: { id: string | number }) {
    const response = await API.delete<ResponseInterface<boolean>>(
      `${API_routes.models.product}/${id}`
    )
    return response.data
  }

  /** Altera um produto com seu ID */
  async editDocument({ id, ...body }: APIeditDocumentI) {
    const response = await API.put<ResponseInterface<boolean>>(
      `${API_routes.models.product}/${id}`,
      body
    )
    return response.data
  }

  /** Recebe um array com todos os produtos de forma paginada e filtrado pelo search */
  async getDocument(pagination?: useQueryGetPaginationType, search = '') {
    const response = await API.get<ResponseGetPagesInterface<ProductInterface[]>>(
      API_routes.models.product,
      {
        params: { ...pagination, search },
      }
    )
    return response.data.data
  }
}

const Product = new ProductClass()
export { Product }
