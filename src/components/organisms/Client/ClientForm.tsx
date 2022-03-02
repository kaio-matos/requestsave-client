// React
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

// Material
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Molecules
import { DisplayError } from '@components/molecules/DisplayError'
import Loading from '@components/molecules/Loading'

// Types
import { IClientForm } from '@type/models/Client'
import { errorInterface } from '@type/Error'

// Validations
import ClientValidate from '@validations/ClientValidate'

// DEV
import { useClientQueryCreate } from '@hooks/queries/Client'

export default function ClientForm() {
  const { control, getValues, reset } = useForm<IClientForm>()
  const [error, setError] = useState<errorInterface>()

  const { isLoading, mutate } = useClientQueryCreate({
    onError({ response }) {
      setError({ message: response.data.meta.cause, show: true })
    },
    onSuccess() {
      setError({
        message: '',
        show: false,
      })
    },
  })

  const addClient = async () => {
    const values = getValues()

    const validation = await ClientValidate.create(values)

    if (validation === true) {
      mutate(values)
      reset({ name: '', email: '' })
    } else setError({ message: validation.message, show: true })
  }

  return (
    <Box
      sx={{
        minWidth: '20rem',
        maxWidth: '30rem',
        width: '20vw',
      }}
    >
      <Paper sx={{ minHeight: '90vh' }} elevation={5}>
        <Box padding={2}>
          <Typography style={{ fontSize: '1.5rem' }} variant="h1" component="h1">
            Criar cliente
          </Typography>
          <Box>
            <Typography variant="caption" display="block">
              Todos os campos com * são obrigatórios
            </Typography>
            <DisplayError error={error} />
          </Box>
          <Box sx={{ columnGap: 25 }}>
            <Controller
              control={control}
              defaultValue=""
              name="name"
              render={({ field }) => (
                <TextField
                  error={error ? error.show : false}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome do cliente"
                  autoComplete="off"
                  autoFocus
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
                  fullWidth
                  id="email"
                  label="Email do cliente"
                  autoComplete="off"
                  {...field}
                />
              )}
            />
            <Button onClick={addClient} color="primary">
              Criar
              <AddIcon />
            </Button>

            <Loading loading={isLoading} />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
