// React
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

// Material
import { Box, Button, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Molecules
import { DisplayError } from '@components/molecules/DisplayError'
import PhoneNumberField from '@components/molecules/PhoneNumberField'
import Loading from '@components/molecules/Loading'

// Validations
import AccountTieValidate from '@validations/AccountTieValidate'

// Hooks
import { errorInterface } from '@type/Error'
import { AccountTieFormInterface } from '@type/models/AccountTie'
import { useAdminAccountTieQueryCreate } from '@hooks/queries/admin/AccountTie'

// Types

export default function PhoneNumberForm() {
  const { getValues, reset, control } = useForm<AccountTieFormInterface>()
  const [error, setError] = useState<errorInterface>()

  const { isLoading, mutate } = useAdminAccountTieQueryCreate({
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

  const addAccountTie = async () => {
    const values = getValues()

    const validation = await AccountTieValidate.create(values)

    if (validation === true) {
      mutate(values)
      reset({ phoneNumber: '' })
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
            Criar número
          </Typography>
          <Box>
            <Typography variant="caption" display="block">
              Todos os campos com * são obrigatórios
            </Typography>
            <DisplayError error={error} />
          </Box>
          <Box sx={{ gridColumnGap: 25 }}>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PhoneNumberField
                  label="Número de telefone"
                  error={error}
                  required={true}
                  field={field}
                />
              )}
            />
            <Box display="flex" gap="5">
              <Button onClick={addAccountTie} color="primary">
                Criar
                <AddIcon />
              </Button>
              <Loading loading={isLoading} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
