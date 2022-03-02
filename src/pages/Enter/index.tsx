// React
import { Route } from 'react-router-dom'

// Material
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

// Templates
import Login from '@components/templates/Login'
import Forget from '@components/templates/ForgetPassword'
import Register from '@components/templates/Register'
import ConfirmRegistration from '@components/templates/ConfirmRegistration'
import ResendConfirmationEmail from '@components/templates/ResendConfirmationEmail'

export default function Enter() {
  return (
    <Grid container component="main" className="root">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="image" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forget">
          <Forget />
        </Route>
        <Route path="/confirmregistration">
          <ConfirmRegistration />
        </Route>
        <Route path="/resendemail">
          <ResendConfirmationEmail />
        </Route>
      </Grid>
    </Grid>
  )
}
