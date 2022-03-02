import { ClientInterface } from './models/Client'
import { ProductInterface } from './models/Product'
import { RequestType } from './models/Request'

export interface ResponseInterface<
  T = RequestType[] | ClientInterface[] | ProductInterface[] | boolean
> {
  message: string
  data: T
}

export interface ResponseJWTInterface extends ResponseInterface {
  jwt: string
}

export type GetPagesType<T> = { table: T; quantity: number }

export interface ResponseGetPagesInterface<T> extends Omit<ResponseInterface, 'data'> {
  data: GetPagesType<T>
}
