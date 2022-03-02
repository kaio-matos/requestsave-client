// React
import { useState, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

// Material
import { Typography, Avatar, Button, TextField, Link, Box, Grid, Checkbox } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

// Molecules
import { DisplayError } from '@components/molecules/DisplayError'
import Loading from '@components/molecules/Loading'
import Copyright from '@components/molecules/Copyright'

// Utils - Contexts
import { useAccount } from '@contexts/LoginContext'
import AccountValidate from '@validations/AccountValidate'

// Types
import { errorInterface } from '@type/Error'
import { useAccountQueryLogin } from '@hooks/queries/Account'

type ILoginForm = {
  email: string
  password: string
}

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState<errorInterface>()
  const history = useHistory()
  const { login } = useAccount()

  const { control, getValues } = useForm<ILoginForm>()
  const { isLoading, mutate } = useAccountQueryLogin({
    onError({ response }) {
      setError({ message: response.data.meta.cause, show: true })
      history.push('/login')
    },
    onSuccess(response) {
      login(response.data)
      setError({
        message: '',
        show: false,
      })
    },
  })

  const handleLogin = async () => {
    const { email, password }: ILoginForm = getValues()
    const validation = await AccountValidate.login({ email, password })

    if (validation === true) mutate({ email, password })
    else setError({ message: validation.message, show: true })
  }

  const handleKeyPressed = (e: KeyboardEvent) => {
    if (e.key === 'Enter') return handleLogin()
  }

  const handleCheckbox = () => {
    setShowPass(!showPass)
  }

  const keyPressedEffect = () => {
    document.addEventListener('keydown', handleKeyPressed)
    return function () {
      document.removeEventListener('keydown', handleKeyPressed)
    }
  }

  useEffect(keyPressedEffect)

  return (
    <Box className="paper">
      <Avatar className="avatar">
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Entrar
      </Typography>
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
            autoFocus
            {...field}
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className="submit"
        onClick={handleLogin}
      >
        Entrar
      </Button>
      <Box display="flex" justifySelf="flex-start" alignItems="center" width="100%">
        <Checkbox checked={showPass} color="primary" onChange={handleCheckbox} />
        <Typography variant="subtitle2">Mostrar senha</Typography>
      </Box>
      <Box marginBottom={2}>
        <DisplayError error={error as errorInterface} />
        <Loading loading={isLoading} />
      </Box>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item>
          <Link component={RouterLink} to="/forget" variant="body2">
            Esqueceu a senha?
          </Link>
        </Grid>
        <Grid item sm={5} style={{ textAlign: 'center' }}>
          <Link component={RouterLink} to="/resendemail" variant="body2">
            Não confirmou o email? Enviar novamente
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/register" variant="body2">
            Criar conta
          </Link>
        </Grid>
      </Grid>
      <Box style={{ position: 'absolute', bottom: 50 }}>
        <Copyright />
      </Box>
    </Box>
  )
}
