import { ResponseInterface, ResponseGetPagesInterface } from '@type/ResponseType'
import { API_routes } from './API_routes'
import { RequestType } from '@type/models/Request'
import { API } from '@services/API'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { APIeditDocumentI } from '@type/API'

class RequestClass {
  action = API_routes.models.request

  async createDocument(body: unknown) {
    const response = await API.post<ResponseInterface<RequestType>>(API_routes.models.request, body)
    return response.data
  }

  async deleteDocument({ id }: { id: string | number }) {
    const response = await API.delete<ResponseInterface<boolean>>(
      `${API_routes.models.request}/${id}`
    )
    return response.data
  }

  async editDocument({ id, ...body }: APIeditDocumentI) {
    const response = await API.put<ResponseInterface<boolean>>(
      `${API_routes.models.request}/${id}`,
      body
    )
    return response.data
  }

  async getDocument(pagination: useQueryGetPaginationType, search = '') {
    const response = await API.get<ResponseGetPagesInterface<RequestType[]>>(
      API_routes.models.request,
      { params: { ...pagination, search } }
    )

    return response.data.data
  }
}

const Request = new RequestClass()
export { Request }
