// React
import { Link as RouterLink } from 'react-router-dom'

// Material
import { Typography, Avatar, Button, Link, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

// Molecules
import Copyright from '@components/molecules/Copyright'

export default function CheckEmail() {
  return (
    <Box className="paper" sx={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>
      <Box display="flex" justifyContent="center">
        <Avatar className="avatar">
          <CheckCircleIcon />
        </Avatar>
      </Box>
      <Typography component="h1" variant="h6">
        Email enviado com sucesso,
        <br />
        cheque sua caixa de entrada.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link to="/resendemail" component={RouterLink}>
          <Button fullWidth variant="contained" color="primary" className="submit">
            Enviar email novamente
          </Button>
        </Link>

        <Link to="/login" component={RouterLink}>
          <Button fullWidth variant="contained" color="primary" className="submit">
            Entrar
          </Button>
        </Link>
      </Box>
      <Box style={{ position: 'absolute', bottom: 50 }}>
        <Copyright />
      </Box>
    </Box>
  )
}
