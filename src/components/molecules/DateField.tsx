// React
import { useState, useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'

// Material
import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import ptBRLocale from 'date-fns/locale/pt-BR'

// Types
import { errorInterface } from '@type/Error'

export default function DateField({
  name,
  setValue,
}: {
  name: string
  setValue: UseFormSetValue<any>
}) {
  const [changedDate, setChangedDate] = useState<Date>()
  const [error, setError] = useState<errorInterface>()

  useEffect(() => {
    // Começa com uma data base guardada nas variáveis
    setValue(name, new Date())
    setChangedDate(new Date())
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
      <DatePicker
        onError={(error: unknown) => {
          if (error) {
            return setError({
              message: 'Data inválida',
              show: true,
            })
          }
        }}
        value={changedDate}
        onChange={(selectedDate) => {
          setChangedDate(selectedDate as Date)
          setValue(name, selectedDate)

          setError({
            message: '',
            show: false,
          })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="normal"
            autoComplete="off"
            required
            fullWidth
            helperText={error?.message}
          />
        )}
      />
    </LocalizationProvider>
  )
}
