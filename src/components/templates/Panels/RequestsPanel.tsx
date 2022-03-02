// Material
import { Box } from '@mui/material'

// Organisms
import RequestsTable from '@components/organisms/Request/RequestsTable'
import RequestForm from '@components/organisms/Request/RequestForm'

// Style Object
import panelClasses from './style'

export default function RequestsPanel() {
  return (
    <Box sx={panelClasses.panelContainer}>
      <RequestForm />
      <RequestsTable />
    </Box>
  )
}
