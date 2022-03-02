// React
import { Link as RouterLink } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

// Thirdparty utils
import * as yup from 'yup'

// Material
import { Typography, Avatar, Button, TextField, Link, Box, Grid, Checkbox } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

// Molecules
import { DisplayError } from '@components/molecules/DisplayError'
import Copyright from '@components/molecules/Copyright'
import Loading from '@components/molecules/Loading'

// Utils
import { Account } from '@api/Account'
import CheckEmail from './CheckEmail'

// Types
import { errorInterface } from '@type/Error'
import PhoneNumberField from '@components/molecules/PhoneNumberField'
import { RegisterFormI } from '@type/Requests/AccountAPI'
import AccountValidate from '@validations/AccountValidate'
import { useAccountQueryRegister } from '@hooks/queries/Account'

const RegisterSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phoneNumber: yup.string().length(15).required(),
})

export default function Register() {
  const [showPass, setShowPass] = useState(false)
  const [showCheckEmail, setShowCheckEmail] = useState(false)
  const [error, setError] = useState<errorInterface>()

  const { control, getValues } = useForm<RegisterFormI>()

  const { mutate, isLoading } = useAccountQueryRegister({
    onError({ response }) {
      setShowCheckEmail(false)
      setError({
        message: response.data.meta.cause,
        show: true,
      })
    },
    onSuccess(data) {
      setShowCheckEmail(true)
      setError({
        message: '',
        show: false,
      })
    },
  })

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setShowPass(!showPass)
  }

  const register = async () => {
    const values: RegisterFormI = getValues()

    const validation = await AccountValidate.register(values)

    if (validation !== true) return setError({ message: validation.message, show: true })

    if (values.password !== values.confirmPassword)
      return setError({ message: 'As duas senhas não estão iguais', show: true })

    if (values.password.length < 6)
      return setError({ message: 'A senha deve ser maior que 6 caracteres', show: true })

    const { confirmPassword, ...accountData } = values

    mutate(accountData)
  }

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      if (e.key === 'Enter') return register()
    }
    document.addEventListener('keydown', handleKeyPressed)
    return function () {
      document.removeEventListener('keydown', handleKeyPressed)
    }
  })

  return (
    <>
      {showCheckEmail ? (
        <CheckEmail />
      ) : (
        <Box className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <Box component="form" className="form" method="POST" style={{ position: 'relative' }}>
            <Controller
              control={control}
              defaultValue=""
              name="firstName"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="Primeiro Nome"
                  autoComplete="firstName"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              defaultValue=""
              name="lastName"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  autoComplete="lastName"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              defaultValue=""
              name="email"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  {...field}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PhoneNumberField
                  label="Número de telefone"
                  error={{ message: '', show: false }}
                  required={true}
                  field={field}
                />
              )}
            />

            <Controller
              control={control}
              defaultValue=""
              name="password"
              render={({ field }) => (
                <TextField
                  type={showPass ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  id="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              defaultValue=""
              name="confirmPassword"
              render={({ field }) => (
                <TextField
                  type={showPass ? 'text' : 'password'}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Confirmar senha"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            <Box display="flex" justifySelf="flex-start" alignItems="center">
              <Checkbox checked={showPass} color="primary" onChange={handleCheckbox} />
              <Typography variant="subtitle2">Mostrar senha</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={register}
            >
              Registrar
            </Button>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              margin={2}
            >
              <DisplayError error={error} />
              <Loading loading={isLoading} />
            </Box>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {'Entrar'}
                </Link>
              </Grid>
            </Grid>
            <Box style={{ position: 'absolute', bottom: 25 }}>
              <Copyright />
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
