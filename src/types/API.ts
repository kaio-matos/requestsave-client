import { AxiosError, AxiosResponse } from 'axios'

interface responseErrorType extends AxiosResponse {
  data: {
    code: string
    meta: {
      cause: string
    }
    status: number
  }
}

export interface APIErrorI extends AxiosError {
  response: responseErrorType
}

export interface APIResponse<T> extends AxiosResponse<T> {}

export interface APIeditDocumentI {
  id: string | number
  [key: string | number | symbol]: any
}
