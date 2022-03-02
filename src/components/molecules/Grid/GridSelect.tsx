import { MenuItem, Select } from '@mui/material'
import { GridRenderEditCellParams } from '@mui/x-data-grid'

type GridSelectPropsType = {
  params: GridRenderEditCellParams
  items: any[]
}

export default function GridSelect({ params, items }: GridSelectPropsType) {
  const { id, api, field, value } = params
  const item = value as any

  return (
    <Select
      sx={{ width: '100%' }}
      onChange={(e) => {
        api.setEditCellValue({
          id,
          field,
          value: items.find((item) => item.id === e.target.value),
        })
      }}
      defaultValue={item.id}
    >
      {items.map(({ id, name }) => {
        return <MenuItem value={id}>{name}</MenuItem>
      })}
    </Select>
  )
}
