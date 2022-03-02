import { Tooltip } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'

type GridToolTipType = {
  params?: GridRenderCellParams
  value?: string
}

export default function GridToolTip({ params, value }: GridToolTipType) {
  return (
    <Tooltip title={value ? value : params ? params.row[params.field] : ''}>
      <span className="table-cell-trucate">
        {value ? value : params ? params.row[params.field] : ''}
      </span>
    </Tooltip>
  )
}
