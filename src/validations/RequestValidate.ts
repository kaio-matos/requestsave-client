import * as yup from 'yup'
import { STATUS_ARRAY } from '@utils/constants'
import { ValidationError } from 'yup'
import { IRequestForm } from '@type/models/Request'

class RequestValidate {
  async create(data: IRequestForm) {
    const schema = yup.object().shape({
      expiresIn: yup.date().required('Selecione uma data'),
      product_id: yup.string().required('Selecione um produto'),
      client_id: yup.string().required('Selecione um cliente'),
      status: yup
        .string()
        .equals(STATUS_ARRAY.map((st) => st.code))
        .required('Selecione um status'),

      paidOut: yup
        .number()
        .moreThan(-1, 'O valor pago deve ser maior ou igual à 0 ')
        .required('Descreva o valor pago, se não foi pago escreva 0'),

      price: yup
        .number()
        .moreThan(0, 'O preço deve ser maior que 0')
        .required('Descreva o preço do pedido'),

      title: yup
        .string()
        .min(3, 'O título deve conter pelo menos 3 letras')
        .max(50)
        .required('Descreva o título'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async edit(data: unknown) {
    const schema = yup.object().shape({
      id: yup.number().positive().required('Erro de validação, faltou: ID'),
      product_id: yup.number().positive().required('Erro de validação, faltou: ID do produto'),
      client_id: yup.number().positive().required('Erro de validação, faltou: ID do cliente'),

      title: yup
        .string()
        .min(3, 'O título precisa ter pelo menos 3 caracteres')
        .max(50, 'O título apenas pode ter no máximo 50 caracteres')
        .required('Erro de validação, faltou: Título'),
      status: yup
        .string()
        .equals(STATUS_ARRAY.map((st) => st.code))
        .required('Selecione um status'),

      paidOut: yup
        .number()
        .moreThan(-1, 'O valor pago deve ser maior ou igual à 0 ')
        .required('Descreva o valor pago, se não foi pago escreva 0'),

      price: yup
        .number()
        .moreThan(0, 'O preço deve ser maior que 0')
        .required('Descreva o preço do pedido'),

      expiresIn: yup.date().required('Erro de validação, faltou: Expira em'),
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

export default new RequestValidate()
