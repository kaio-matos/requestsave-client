// Material
import { Box } from '@mui/material'

// Organisms
import ClientForm from '@components/organisms/Client/ClientForm'
import ClientsTable from '@components/organisms/Client/ClientsTable'

// Style Object
import panelClasses from './style'

export default function ClientsPanel() {
  return (
    <>
      <Box sx={panelClasses.panelContainer}>
        <ClientForm />
        <ClientsTable />
      </Box>
    </>
  )
}
