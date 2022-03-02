// React
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

// Material
import { Box, Typography, TextField, Checkbox, Button, Snackbar, Alert, Paper } from '@mui/material'

// Molecules
import { DisplayError, standardError } from '@components/molecules/DisplayError'

// Types
import { AccountInterface } from '@type/models/Account'
import { errorInterface } from '@type/Error'
import AccountValidate from '@validations/AccountValidate'
import { Account } from '@api/Account'
import { APIErrorI } from '@type/API'
import { useMutation } from 'react-query'

export default function ChangePassword({ account }: { account: AccountInterface }) {
  const { getValues, control } = useForm()
  const [error, setError] = useState<errorInterface>()
  const [success, setSuccess] = useState<{ message: string; show: boolean }>()
  const [showPass, setShowPass] = useState(false)

  const history = useHistory()

  const { mutate } = useMutation(Account.resetPassword, {
    onError({ response }: APIErrorI) {
      setError({ message: response.data.meta.cause, show: true })
      setSuccess({ message: '', show: false })
    },
    onSuccess(response) {
      setSuccess({ message: response.message, show: true })
      setTimeout(() => {
        history.push('/panel')
      }, 1000)
      setError(standardError)
    },
  })

  const changePassword = async () => {
    const { password, confirmPassword } = getValues()

    const validation = await AccountValidate.changePassword({ password, confirmPassword })

    if (validation === true) mutate({ email: account.email, password })
    else setError({ message: validation.message, show: true })
  }

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}
      component={'form'}
      className="form"
      method="POST"
    >
      <Paper sx={{ padding: 3 }} elevation={3}>
        <Box mt={3}>
          <Typography variant="subtitle1">Trocar senha</Typography>
        </Box>
        <Controller
          control={control}
          defaultValue=""
          name="password"
          render={({ field }) => (
            <TextField
              error={error ? error.show : false}
              type={showPass ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nova senha"
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
              error={error ? error.show : false}
              type={showPass ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirme a senha"
              {...field}
            />
          )}
        />
        <DisplayError error={error} />
        <Snackbar open={success?.show} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            {success?.message}
          </Alert>
        </Snackbar>
        <Box display="flex" alignItems="center" marginY={1}>
          <Checkbox
            checked={showPass}
            color="primary"
            onChange={() => {
              setShowPass(!showPass)
            }}
          />
          <Typography variant="subtitle2">Mostrar senha</Typography>
        </Box>

        <Button onClick={changePassword} color="primary">
          Trocar
        </Button>
      </Paper>
    </Box>
  )
}
