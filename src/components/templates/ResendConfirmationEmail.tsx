// React
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link as RouterLink, useHistory } from 'react-router-dom'

// Material
import { Grid, Avatar, Button, TextField, Link, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

// Molecules
import Copyright from '@components/molecules/Copyright'
import Loading from '@components/molecules/Loading'

// Types
import AccountValidate from '@validations/AccountValidate'
import { useAccountQueryResendRegisterEmail } from '@hooks/queries/Account'
import { resendRegisterEmailFormI } from '@type/Requests/AccountAPI'
import { messageInterface } from '@type/Message'
import { AlertMessage } from '@components/molecules/AlertMessage'

export default function ResendConfirmationEmail() {
  const [message, setMessage] = useState<messageInterface>({
    severity: 'error',
    message: '',
  })

  const { control, getValues } = useForm<resendRegisterEmailFormI>()
  const { mutate, isLoading, isSuccess } = useAccountQueryResendRegisterEmail({
    onError({ response }) {
      setMessage({
        severity: 'error',
        message: response.data.meta.cause,
      })
    },
    onSuccess() {
      setMessage({
        severity: 'success',
        message: 'Email enviado com sucesso',
      })
    },
  })

  const history = useHistory()

  const resendEmail = async () => {
    const values: resendRegisterEmailFormI = getValues()

    const validation = await AccountValidate.resendRegisterEmail(values)
    if (validation !== true) return setMessage({ severity: 'error', message: validation.message })

    mutate(values)
  }

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      if (e.key === 'Enter') return resendEmail()
    }
    document.addEventListener('keydown', handleKeyPressed)
    return () => document.removeEventListener('keydown', handleKeyPressed)
  })

  useEffect(() => {
    if (!isSuccess) return
    const pushToLogin = setTimeout(() => {
      history.push('/login')
    }, 5000)

    return () => clearTimeout(pushToLogin)
  }, [isSuccess])

  return (
    <Box className="paper">
      <Avatar className="avatar">
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reenviar email de verificação
      </Typography>
      <Box component="form" className="form" method="POST" style={{ position: 'relative' }}>
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className="submit"
          onClick={resendEmail}
        >
          Reenviar email de confirmação
        </Button>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin={1}
        >
          <Loading loading={isLoading} />
          <AlertMessage message={message}>{message.message}</AlertMessage>
        </Box>

        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              {'Entrar'}
            </Link>
          </Grid>
          <Grid item marginX={2}>
            <Copyright />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
