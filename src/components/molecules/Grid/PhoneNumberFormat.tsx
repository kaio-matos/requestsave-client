import NumberFormat from 'react-number-format'
import { GridRenderEditCellParams } from '@mui/x-data-grid'

function PhoneNumberFormatEdit(props: GridRenderEditCellParams) {
  const { id, api, field, value } = props

  return (
    <NumberFormat
      style={{ border: 'none', outline: 'none', fontSize: '1rem' }}
      value={value as number}
      onValueChange={(values) => {
        api.setEditCellValue({ id, field, value: values.formattedValue })
      }}
      type="tel"
      format="(##) #####-####"
      mask=""
    />
  )
}

export { PhoneNumberFormatEdit }
