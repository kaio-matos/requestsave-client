import { ResponseGetPagesInterface, ResponseInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { API } from '@services/API'
import { ProductInterface } from '@type/models/Product'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

class ProductClass {
  action = API_routes.models.product

  async createDocument(body: unknown) {
    const response = await API.post<ResponseInterface<ProductInterface>>(
      API_routes.models.product,
      body
    )
    return response.data
  }

  async deleteDocument({ id }: { id: string | number }) {
    const response = await API.delete<ResponseInterface<boolean>>(
      `${API_routes.models.product}/${id}`
    )
    return response.data
  }

  async editDocument({ id, ...body }: APIeditDocumentI) {
    const response = await API.put<ResponseInterface<boolean>>(
      `${API_routes.models.product}/${id}`,
      body
    )
    return response.data
  }

  async getDocument(pagination?: useQueryGetPaginationType, search = '') {
    const response = await API.get<ResponseGetPagesInterface<ProductInterface[]>>(
      API_routes.models.product,
      { params: { ...pagination, search } }
    )
    return response.data.data
  }
}

const Product = new ProductClass()
export { Product }
