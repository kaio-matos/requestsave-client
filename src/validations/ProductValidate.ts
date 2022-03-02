import { IProductForm } from '@type/models/Product'
import * as yup from 'yup'
import { ValidationError } from 'yup'

class ProductValidate {
  async create(data: IProductForm) {
    const schema = yup.object().shape({
      basePrice: yup
        .number()
        .strict()
        .positive('O preço base deve ser maior do que 0')
        .required('Descreva o preço base'),
      name: yup
        .string()
        .min(3, 'O nome deve conter pelo menos 3 letras')
        .max(50, 'O limite do nome é 50 letras')
        .required('O nome é obrigatório'),
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
      basePrice: yup.number().strict().positive().required('Erro de validação, faltou: Preço Base'),
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

export default new ProductValidate()
