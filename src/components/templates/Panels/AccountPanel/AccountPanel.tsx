// React
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Material
import { Box, Button, Paper, IconButton, Snackbar, Alert, AlertColor } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'

// Contexts
import { useAccount } from '@contexts/LoginContext'

// Style object
import panelClasses from '../style'

// Validation
import AccountValidate from '@validations/AccountValidate'

// Hooks
import { useAccountQueryEdit } from '@hooks/queries/Account'

// Types
import Loading from '@components/molecules/Loading'

type MessageType = {
  message: string
  show: boolean
  severity: AlertColor
}

export default function AccountPanel() {
  const [lock, setLock] = useState(true)
  const [name, setName] = useState({ first: '', last: '' })
  const [message, setMessage] = useState<MessageType>({
    message: '',
    show: false,
    severity: 'success',
  })

  const { setAccount, account } = useAccount()
  const { isLoading, mutate } = useAccountQueryEdit({
    onError({ response }) {
      setName({ first: account.firstName, last: account.lastName })
      setMessage({ message: response.data.meta.cause, show: true, severity: 'error' })
    },
    onSuccess(response) {
      setAccount({
        email: account.email,
        firstName: name.first,
        lastName: name.last,
        role: account.role,
      })

      setMessage({
        message: response.message,
        show: response.data,
        severity: 'success',
      })
      setLock(true)
    },
  })

  useEffect(() => {
    setName({ first: account.firstName, last: account.lastName })
  }, [])

  const checkAndEditAccount = async () => {
    const data = {
      firstName: name.first,
      lastName: name.last,
    }

    if (data.firstName === account.firstName && data.lastName === account.lastName) return
    const validation = await AccountValidate.changeNames(data)

    if (validation === true) mutate(data)
    else setMessage({ message: validation.message, show: true, severity: 'error' })
  }

  return (
    <>
      <Box
        sx={{
          ...panelClasses.panelContainer,
          height: '90vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          display="grid"
          gap={5}
          sx={{
            height: '80%',
            width: '90%',
            padding: 3,
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <Paper sx={{ padding: 3 }} elevation={3}>
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h4" gutterBottom component="div">
                Conta
              </Typography>
              <div>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Nome:
                </Typography>
                <Typography>
                  {account.firstName} {account.lastName}
                </Typography>
              </div>
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom component="div">
                Email:
              </Typography>
              <Typography>{account.email}</Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              padding: 3,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            elevation={3}
          >
            <Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  transform: 'translate(50%, -50%)',
                }}
              >
                <IconButton onClick={() => setLock(!lock)} size="large">
                  {lock ? <LockIcon fontSize="large" /> : <LockOpenIcon fontSize="large" />}
                </IconButton>
              </Box>
              <TextField
                variant="outlined"
                margin="normal"
                disabled={lock}
                required
                fullWidth
                defaultValue={account.firstName}
                onChange={(e) => setName((name) => ({ ...name, first: e.target.value }))}
                name="firstName"
                label="Primeiro nome"
                autoComplete="off"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                disabled={lock}
                required
                fullWidth
                defaultValue={account.lastName}
                onChange={(e) => setName((name) => ({ ...name, last: e.target.value }))}
                name="lastName"
                label="Último nome"
                autoComplete="off"
                autoFocus
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={checkAndEditAccount} disabled={lock} color="primary">
                  Salvar alterações
                </Button>
                <Button
                  onClick={() => {
                    setName({ first: account.firstName, last: account.lastName })
                    setLock(true)
                  }}
                  disabled={lock}
                  color="error"
                >
                  Cancelar
                </Button>
              </Box>
            </Box>

            <Box>
              <Button
                disabled={lock}
                color="primary"
                to="/panel/account/changepassword"
                component={RouterLink}
              >
                Mudar senha
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ position: 'absolute' }}>
          <Loading loading={isLoading} />
        </Box>
        <Snackbar
          open={message.show}
          onClose={() => setMessage({ message: '', show: false, severity: 'error' })}
          autoHideDuration={5000}
        >
          <Alert severity={message.severity}>{message.message}</Alert>
        </Snackbar>
      </Box>
    </>
  )
}
