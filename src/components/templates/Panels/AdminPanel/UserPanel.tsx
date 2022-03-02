// Material
import { Box } from '@mui/material'

// Organisms
import UserTable from '@components/organisms/Users/UserTable'

// Style Object
import panelClasses from '../style'

export default function UsersPanel() {
  return (
    <>
      <Box sx={panelClasses.panelContainer}>
        <UserTable />
      </Box>
    </>
  )
}
