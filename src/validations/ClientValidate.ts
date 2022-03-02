import { IClientForm } from '@type/models/Client'
import * as yup from 'yup'
import { ValidationError } from 'yup'

class ClientValidate {
  async create(data: IClientForm) {
    const schema = yup.object().shape({
      name: yup
        .string()
        .min(3, 'O nome precisa ter pelo menos 3 caracteres')
        .max(50)
        .required('O nome é obrigatório'),
      email: yup.string().email('Descreva o email corretamente'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async edit(data: unknown) {
    const schema = yup.object({
      id: yup.number().positive().required('Erro de validação, faltou: ID'),
      name: yup
        .string()
        .min(3, 'O nome precisa ter pelo menos 3 caracteres')
        .max(50, 'O nome apenas pode ter no máximo 50 caracteres')
        .required('Erro de validação, faltou: Nome'),
      email: yup.string().email('Descreva o email corretamente'),

      createdAt: yup.date().required('Erro de validação, faltou: Criado em'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async delete(data: unknown) {
    const schema = yup.object({
      id: yup.number().positive().required('Erro de validação, faltou: ID'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }
}
export default new ClientValidate()
