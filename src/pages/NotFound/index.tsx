// Material
import { Box, Button, Typography } from '@mui/material'
import { Home } from '@mui/icons-material'
import { Paper } from '@mui/material'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [account, setAccount] = useState<string | null>()

  useEffect(() => {
    setAccount(sessionStorage.getItem('account'))
  }, [])

  return (
    <Paper
      style={{
        height: '100vh',
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <Box
        style={{ height: '100%' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">404</Typography>
        <Typography variant="subtitle1">Page Not Found | 404</Typography>
        <Button color="secondary" aria-label="home" href={account ? '/panel' : '/login'}>
          <Home />
        </Button>
      </Box>
    </Paper>
  )
}
