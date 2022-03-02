import { ProductInterface } from './Product'
import { ClientInterface } from './Client'
import { STATUS } from '@utils/constants'

export type RequestType = {
  account_id: string | number
  id: string | number
  client_id: string | number
  product_id: string | number

  client: ClientInterface
  product: ProductInterface

  status?: STATUS
  paidOut?: number
  balance?: number
  title: string
  price: number

  expiresIn: Date
  createdAt: Date
  updatedAt?: Date
}

export interface IRequestForm {
  title: string
  client_id: string | number
  product_id: string | number
  status: STATUS

  price: string | number
  paidOut: string | number

  expiresIn: Date
}
