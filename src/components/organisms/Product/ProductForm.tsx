// React
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

// Material
import { Box, Button, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'

// Molecules
import { DisplayError } from '@components/molecules/DisplayError'
import MoneyField from '@components/molecules/MoneyField'
import Loading from '@components/molecules/Loading'

// Types
import { IProductForm } from '@type/models/Product'
import { errorInterface } from '@type/Error'

// Validations
import ProductValidate from '@validations/ProductValidate'

// Hooks
import { useProductQueryCreate } from '@hooks/queries/Product'

export default function ProductForm() {
  const { getValues, reset, control } = useForm<IProductForm>()
  const [error, setError] = useState<errorInterface>()

  const { isLoading, mutate } = useProductQueryCreate({
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

  const addProduct = async () => {
    const values = getValues()
    values.basePrice = +values.basePrice

    const validation = await ProductValidate.create(values)

    if (validation === true) {
      mutate(values)
      reset({ name: '', basePrice: '' })
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
            Criar produto
          </Typography>
          <Box>
            <Typography variant="caption" display="block">
              Todos os campos com * são obrigatórios
            </Typography>
            <DisplayError error={error} />
          </Box>
          <Box sx={{ gridColumnGap: 25 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={error ? error.show : false}
                  label="Nome do produto"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="basePrice"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <MoneyField label="Preço base" error={error} required={true} field={field} />
              )}
            />

            <Box display="flex" gap="5">
              <Button onClick={addProduct} color="primary">
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
