import { AccountTieGetInterface } from '@type/models/AccountTie'

export interface AccountTieAdaptedInterface extends Omit<AccountTieGetInterface, 'account'> {
  accountName?: string
  accountEmail?: string
}
