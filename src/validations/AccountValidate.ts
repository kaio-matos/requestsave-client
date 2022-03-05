import * as yup from 'yup'
import { ValidationError } from 'yup'
import 'yup-phone'
import {
  confirmRegistrationValidationI,
  forgetPasswordEmailValidationI,
  forgetResetpasswordValidationI,
  loginParamsBodyI,
  resendRegisterEmailFormI,
} from '@type/Requests/AccountAPI'
import { RegisterFormI } from '../types/Requests/AccountAPI'
import { ROLES_ARRAY } from '@utils/constants'

const PASSWORD_MIN_LENGTH = 6

class AccountValidate {
  async login(data: loginParamsBodyI) {
    if (data.email.toLowerCase() === 'admin' && data.password.toLowerCase() === 'admin') return true

    const schema = yup.object({
      email: yup
        .string()
        .email('Descreva um email válido')
        .min(3, 'O email deve ser maior ou igual a 6 caracteres')
        .max(100)
        .required('O email é obrigatória'),
      password: yup
        .string()
        .min(PASSWORD_MIN_LENGTH, 'O email deve ser maior ou igual a 6 caracteres')
        .max(200)
        .required('O email é obrigatória'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async changeNames(data: { firstName: string; lastName: string }) {
    const schema = yup.object({
      firstName: yup.string().min(3, 'O nome deve ter pelo menos 3 letras').required(),
      lastName: yup.string().min(3, 'O nome deve ter pelo menos 3 letras').required(),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async changePassword(data: { password: string; confirmPassword: string }) {
    const schema = yup.object({
      password: yup
        .string()
        .min(PASSWORD_MIN_LENGTH, 'A senha deve ser maior ou igual a 6 caracteres')
        .max(200)
        .required('A senha é obrigatória'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async register(data: RegisterFormI) {
    const schema = yup.object({
      firstName: yup.string().required('Descreva o primeiro nome'),
      lastName: yup.string().required('Descreva o sobrenome'),
      email: yup.string().email('Descreva um email válido').required('Descreva o email'),
      password: yup.string().required('Descreva a senha'),
      phoneNumber: yup
        .string()
        .phone('BR', undefined, 'O número não está dentro dos padrões')
        .required('Descreva o número'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async resendRegisterEmail(data: resendRegisterEmailFormI) {
    const schema = yup.object({
      email: yup.string().email('Descreva um email válido').required('Descreva seu email'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async confirmRegistration(data: confirmRegistrationValidationI) {
    const schema = yup.object({
      email: yup
        .string()
        .email('O email recebido é inválido')
        .required('Houve um erro: Faltou email de confirmação'),
      token: yup.string().required('Houve um erro: Faltou token de confirmação'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async forgetPasswordEmail(data: forgetPasswordEmailValidationI) {
    const schema = yup.object({
      email: yup
        .string()
        .email('O email descrito é inválido')
        .required('Por favor descreva o email'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async forgetPasswordCheckCode(data: { code: string }) {
    const schema = yup.object({
      code: yup
        .string()
        .length(7, 'O código deve ter pelo menos 7 caracteres')
        .required('Por favor descreva o código'),
    })

    try {
      await schema.validate(data)
      return true
    } catch (reason) {
      return reason as ValidationError
    }
  }

  async forgetResetpassword(data: forgetResetpasswordValidationI) {
    const schema = yup.object({
      email: yup.string().email('O email descrito é inválido').required('Descreva o email'),
      code: yup.string().required('É necessário o código para o reset de senha'),
      password: yup
        .string()
        .min(PASSWORD_MIN_LENGTH, 'A senha deve ser maior ou igual a 6 caracteres')
        .max(200)
        .required('A senha é obrigatória'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
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
      accountTie_id: yup.number().positive().required('Erro de validação, faltou: ID do Vínculo'),

      firstName: yup.string().required('Erro de validação, faltou: Primeiro nome'),
      lastName: yup.string().required('Erro de validação, faltou: Sobrenome'),
      email: yup
        .string()
        .email('Escreva um email válido')
        .required('Erro de validação, faltou: Email'),
      role: yup
        .string()
        .equals(
          ROLES_ARRAY.map((rl) => rl.code),
          'O cargo pode ser apenas: Administrador ou Usuário'
        )
        .required('Erro de validação, faltou: Cargo'),
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

export default new AccountValidate()
