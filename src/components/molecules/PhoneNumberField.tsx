// React
import { forwardRef, useState, useEffect, useRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import NumberFormat from 'react-number-format'

// Material
import { TextField } from '@mui/material'

// Types
import { errorInterface } from '@type/Error'

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat<any> | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

type PhoneNumberProps = {
  label: string

  error: errorInterface | undefined

  required: boolean
  field: ControllerRenderProps<any, any>
}

export default function PhoneNumberField({ label, required, field }: PhoneNumberProps) {
  const { onChange, ref, ...rest } = field
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
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
                value: values.formattedValue,
              },
            })
          }}
          type="tel"
          format="(##) #####-####"
          mask=""
        />
      )
    }
  )

  useEffect(() => {
    if (newPhoneNumber) {
      // Pegamos o elemento no HTML para fazer o foco a cada alteração no estado
      const input = inputRef.current?.children[1].children[0] as HTMLInputElement
      input?.focus()
    }
  }, [newPhoneNumber])

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
        setNewPhoneNumber(event.target.value)
        onChange(event)
      }}
      InputProps={{
        inputComponent: FormattedNumber as any,
      }}
      {...rest}
    />
  )
}
