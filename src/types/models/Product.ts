import { RequestType } from './Request'

export interface ProductInterface {
  id: string
  name: string
  account: string
  basePrice: number
  requests: RequestType[]
  createdAt: Date
  updatedAt: Date
}

export interface IProductForm {
  name: string
  basePrice: string | number
}
