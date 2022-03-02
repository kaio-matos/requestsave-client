// React
import { Route } from 'react-router'

// Material
import { Box } from '@mui/material'

// Organisms
import Header from '@components/organisms/Header'

// Organisms
import { AdminRoute } from '@components/organisms/AdminRoute'

// Templates
import RequestsPanel from '@components/templates/Panels/RequestsPanel'
import ClientsPanel from '@components/templates/Panels/ClientsPanel'
import ProductsPanel from '@components/templates/Panels/ProductsPanel'
import AccountPanel from '@components/templates/Panels/AccountPanel/AccountPanel'
import ChangePassword from '@components/templates/Panels/AccountPanel/ChangePassword'

import PhoneNumbersPanel from '@components/templates/Panels/AdminPanel/PhoneNumber'
import UserPanel from '@components/templates/Panels/AdminPanel/UserPanel'

// Contexts
import { useAccount } from '@contexts/LoginContext'

export default function Panel() {
  const { account } = useAccount()
  return (
    <Box>
      <Header />
      <Route path="/panel/account/changepassword" exact>
        <ChangePassword account={account} />
      </Route>

      <Route path="/panel" exact>
        <RequestsPanel />
      </Route>

      <Route path="/panel/clients" exact>
        <ClientsPanel />
      </Route>

      <Route path="/panel/products" exact>
        <ProductsPanel />
      </Route>

      <Route path="/panel/account" exact>
        <AccountPanel />
      </Route>
      <AdminRoute path="/panel/admin">
        <Route path="/panel/admin/accountties">
          <PhoneNumbersPanel></PhoneNumbersPanel>
        </Route>
        <Route path="/panel/admin/users">
          <UserPanel></UserPanel>
        </Route>
      </AdminRoute>
    </Box>
  )
}
