export interface ClientInterface {
  id: string
  account: string
  name: string
  email?: string
  requests: { id: number; title: string }[]
}

export interface IClientForm {
  name: string
  email?: string
}
