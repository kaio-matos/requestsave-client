// Material
import { Box } from '@mui/material'

// Organisms
import AccountTieForm from '@components/organisms/AccountTie/AccountTieForm'
import AccountTieTable from '@components/organisms/AccountTie/AccountTieTable'

// Molecules
import { PopoverError } from '@components/molecules/PopoverError'

// Context

// Style Object
import panelClasses from '../style'

export default function PhoneNumbersPanel() {
  return (
    <>
      {/* <PopoverError miliseconds={7500} vertical="top" horizontal="right" error={adminError} /> */}
      <Box sx={panelClasses.panelContainer}>
        <AccountTieForm />
        <AccountTieTable />
      </Box>
    </>
  )
}
