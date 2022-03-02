import * as yup from 'yup'
import { ValidationError } from 'yup'
import 'yup-phone'
import { AccountTieFormInterface } from '@type/models/AccountTie'

class AccountTieValidate {
  async create(data: AccountTieFormInterface) {
    const schema = yup.object().shape({
      phoneNumber: yup.string().phone('BR', undefined, 'O número não está dentro dos padrões'),
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
      phoneNumber: yup
        .string()
        .phone('BR', undefined, 'O número não está dentro dos padrões')
        .required('Descreva o número'),
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

export default new AccountTieValidate()
