import { ROLES } from '@utils/constants'
import { AccountTieGetInterface } from './AccountTie'

export interface AccountInterface {
  email: string
  firstName: string
  lastName: string
  role: ROLES
}

export interface UserInterface {
  id: number
  firstName: string
  lastName: string
  email: string
  confirmedEmail: boolean
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface UserGetInterface extends UserInterface {
  accountTie_id: number
  accountTie: AccountTieGetInterface
}
