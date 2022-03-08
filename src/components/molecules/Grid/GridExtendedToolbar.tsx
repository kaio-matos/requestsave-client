import { QuickSearchToolbar } from '@components/molecules/Grid/QuickSearchToolbar'
import { Box } from '@mui/material'
import { GridToolbar } from '@mui/x-data-grid'

interface GridExtendedToolbarProps {
  clearSearch: () => void
  handleSearch: (value: string) => void
  value: string
}

export default function GridExtendedToolbar(props: GridExtendedToolbarProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <GridToolbar />
      <QuickSearchToolbar {...props} />
    </Box>
  )
}
