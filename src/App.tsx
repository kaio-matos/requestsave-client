// React
import { useEffect } from 'react'
import { Route, Switch, Link as RouterLink, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

// Material
import { Link } from '@mui/material'

// Organisms
import { PrivateRoute } from '@components/organisms/PrivateRoute'

// Pages
import Enter from '@pages/Enter'
import Panel from '@pages/Panel'
import NotFound from '@pages/NotFound'

import { useGlobalMessage } from '@contexts/MessageContext'
import { PopoverMessage } from './components/molecules/PopoverMessage'

function App() {
  const history = useHistory()
  const { message } = useGlobalMessage()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) history.push('/panel')
  }, [Cookies.get('token')])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Route>
        <PrivateRoute path="/panel">
          <Route
            path={[
              '/panel',
              '/panel/clients',
              '/panel/products',
              '/panel/account/changepassword',
              '/panel/account',
            ]}
            component={Panel}
          />
        </PrivateRoute>
        <Route
          path={['/login', '/register', '/forget', '/confirmregistration', '/resendemail']}
          component={Enter}
        />
        <Route path="*" component={NotFound} />
      </Switch>

      <PopoverMessage message={message} vertical="bottom" horizontal="center">
        {message.message}
      </PopoverMessage>
    </div>
  )
}

export default App
