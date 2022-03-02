// React
import { forwardRef, useState, useEffect, useRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import NumberFormat from 'react-number-format'

// Material
import { InputAdornment, TextField } from '@mui/material'

// Types
import { errorInterface } from '@type/Error'

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat<any> | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

type MoneyProps = {
  label: string

  error: errorInterface | undefined

  required: boolean
  field: ControllerRenderProps<any, any>
}

export default function MoneyField({ label, required, field }: MoneyProps) {
  const { onChange, ref, ...rest } = field
  const [newPrice, setNewPrice] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)

  // Pegamos a ref da function component
  const FormattedNumber = forwardRef<NumberFormat<any>, NumberFormatCustomProps>(
    function NumberFormatCustom(props, ref) {
      const { onChange, ...other } = props

      return (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            // Alteramos o onChange padrão do nosso input, para estes valores
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            })
          }}
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          isNumericString
          maxLength={20}
        />
      )
    }
  )

  useEffect(() => {
    if (newPrice) {
      // Pegamos o elemento no HTML para fazer o foco a cada alteração no estado
      const input = inputRef.current?.children[1].children[1] as HTMLInputElement
      input?.focus()
    }
  }, [newPrice])

  return (
    <TextField
      ref={inputRef}
      variant="outlined"
      margin="normal"
      fullWidth
      type="text"
      label={label}
      autoComplete="off"
      required={required}
      onChange={(event) => {
        setNewPrice(event.target.value)
        onChange(event)
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        inputComponent: FormattedNumber as any,
      }}
      {...rest}
    />
  )
}
