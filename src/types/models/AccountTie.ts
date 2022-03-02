export interface AccountTieInterface {
  id: number
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
}

export interface AccountTieGetInterface extends AccountTieInterface {
  account: {
    firstName: string
    lastName: string
    email: string
  }
}

export interface AccountTieFormInterface {
  phoneNumber: number | string
}
