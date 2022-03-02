// React
import { useEffect, useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'

// Material
import { Typography, Avatar, Button, Link, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

// Molecules
import Loading from '@components/molecules/Loading'
import Copyright from '@components/molecules/Copyright'

// Hooks
import { useBoolean } from '@hooks/useBoolean'
import { useAccountQueryConfirmRegistration } from '@hooks/queries/Account'

// Utils
import { Account } from '@api/Account'

// Types
import { messageInterface } from '@type/Message'
import { AlertMessage } from '@components/molecules/AlertMessage'
import AccountValidate from '@validations/AccountValidate'

export default function ConfirmRegistration() {
  const [message, setMessage] = useState<messageInterface>({
    severity: 'error',
    message: '',
  })

  const { mutate, isLoading } = useAccountQueryConfirmRegistration({
    onError({ response }) {
      setMessage({
        severity: 'error',
        message: response.data.meta.cause,
      })
    },
    onSuccess() {
      setMessage({
        severity: 'success',
        message: 'Email confirmado com sucesso',
      })
    },
  })

  const history = useHistory()

  useEffect(() => {
    const confirm = async () => {
      const query = new URLSearchParams(history.location.search)
      const email = query.get('email')
      const token = query.get('token')
      const values = { email, token }

      const validation = await AccountValidate.confirmRegistration(values)
      if (validation !== true) return setMessage({ severity: 'error', message: validation.message })

      mutate(values)
    }
    confirm()
  }, [history.location.search])

  return (
    <div
      className="paper"
      style={{
        justifyContent: 'center',
        height: '100vh',
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div>
          <AlertMessage sx={{ marginY: 2 }} message={message}>
            <Typography fontSize={'1.3rem'} component="h1">
              {message.message}
            </Typography>
          </AlertMessage>

          <Link to="/login" component={RouterLink}>
            <Button fullWidth variant="contained" color="primary" className="submit">
              Entrar
            </Button>
          </Link>
          <Box style={{ position: 'absolute', bottom: 50 }}>
            <Copyright />
          </Box>
        </div>
      )}
    </div>
  )
}
