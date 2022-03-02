// React
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

// Material
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Molecules
import MoneyField from '@components/molecules/MoneyField'
import SearchMenu from '@components/molecules/SearchMenu'
import DateField from '@components/molecules/DateField'
import Loading from '@components/molecules/Loading'
import { PopoverError } from '@components/molecules/PopoverError'

// Utils - Contexts
import { STATUS, STATUS_ARRAY } from '@utils/constants'

// Types
import { IRequestForm } from '@type/models/Request'
import { errorInterface } from '@type/Error'

// Validations
import RequestValidate from '@validations/RequestValidate'

// Hooks
import { useRequestQueryCreate } from '@hooks/queries/Request'
import { useClientsQuery } from '@hooks/queries/Client'
import { useProductsQuery } from '@hooks/queries/Product'

export default function RequestForm() {
  const { control, setValue, getValues, reset } = useForm<IRequestForm>()
  const [error, setError] = useState<errorInterface>()

  const { isLoading: loadingRequest, mutate } = useRequestQueryCreate({
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

  const { data: clients } = useClientsQuery()
  const { data: products } = useProductsQuery()

  const addRequest = async () => {
    const values = getValues()
    values.paidOut = values.paidOut ? Number(values.paidOut) : 0
    values.price = values.price ? Number(values.price) : 0

    const validation = await RequestValidate.create(values)

    if (validation === true) {
      mutate(values)
      reset({
        client_id: '',
        title: '',
        product_id: '',
        status: STATUS.TODO,
        price: '',
        paidOut: '',
        expiresIn: values.expiresIn,
      })
    } else setError({ message: validation.message, show: true })
  }

  useEffect(() => {
    setValue('status', STATUS.TODO)
  }, [setValue])

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
          <Typography style={{ fontSize: '1.4rem' }} variant="h1" component="h1">
            Criar pedido
          </Typography>
          <Box>
            <Typography variant="caption" display="block">
              Todos os campos com * são obrigatórios
            </Typography>
          </Box>
          <Box>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Título"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <MoneyField label="Preço" error={error} required={true} field={field} />
              )}
            />
            <Controller
              name="paidOut"
              control={control}
              render={({ field }) => (
                <MoneyField label="Pago" error={error} required={false} field={field} />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => {
                const { value, ...rest } = field

                return (
                  <FormControl
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      defaultValue=""
                      labelId="status"
                      id="status"
                      label="Status"
                      value={value ? value : 'TODO'}
                      {...rest}
                    >
                      {STATUS_ARRAY.map((status) => (
                        <MenuItem key={status.type} value={status.code}>
                          {status.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )
              }}
            />

            <Controller
              name="client_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <SearchMenu
                  label="Cliente"
                  items={clients?.table || []}
                  nameKey="name"
                  idKey="id"
                  field={field}
                />
              )}
            />

            <Controller
              name="product_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <SearchMenu
                  label="Produto"
                  items={products?.table || []}
                  nameKey="name"
                  idKey="id"
                  field={field}
                />
              )}
            />

            <DateField name="expiresIn" setValue={setValue} />
          </Box>
          <Box display="flex" gap="5">
            <Button onClick={addRequest} color="primary">
              Criar
              <AddIcon />
            </Button>

            <Loading loading={loadingRequest} />
          </Box>
          <PopoverError miliseconds={1500} error={error} vertical="bottom" horizontal="left" />
        </Box>
      </Paper>
    </Box>
  )
}
