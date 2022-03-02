import NumberFormat from 'react-number-format'
import { GridRenderEditCellParams } from '@mui/x-data-grid'

const currencyBRLformatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function MoneyFormatEdit(props: GridRenderEditCellParams) {
  const { id, api, field, value } = props

  return (
    <NumberFormat
      style={{ border: 'none', outline: 'none', fontSize: '1rem' }}
      value={value as number}
      onValueChange={(values) => {
        api.setEditCellValue({ id, field, value: values.floatValue })
      }}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      maxLength={20}
    />
  )
}

export { currencyBRLformatter, MoneyFormatEdit }
