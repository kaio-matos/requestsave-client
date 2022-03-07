// Material
import { Box } from '@mui/material'

// Organisms
import AccountTieForm from '@components/organisms/AccountTie/AccountTieForm'
import AccountTieTable from '@components/organisms/AccountTie/AccountTieTable'

// Style Object
import panelClasses from '../style'

export default function PhoneNumbersPanel() {
  return (
    <>
      <Box sx={panelClasses.panelContainer}>
        <AccountTieForm />
        <AccountTieTable />
      </Box>
    </>
  )
}
