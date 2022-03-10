// React
import { Link as RouterLink } from 'react-router-dom'

// Material
import { Link, List, ListItem, ListItemIcon, ListItemText, Box, Button } from '@mui/material'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import StoreIcon from '@mui/icons-material/Store'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'

// Contexts
import { useAccount } from '@contexts/LoginContext'

type IMenuItem = {
  label: string
  icon: JSX.Element
  link: string
}

const CreateMenuItem = (label: string, icon: JSX.Element, link: string): IMenuItem => {
  return { label, icon, link }
}

export default function Header() {
  const { account, logout } = useAccount()
  const isAdmin = account?.role === 'ADMIN'

  const menu: IMenuItem[] = [
    CreateMenuItem('Painel', <DataUsageIcon />, '/panel'),
    CreateMenuItem('Clientes', <RecentActorsIcon />, '/panel/clients'),
    CreateMenuItem('Produtos', <StoreIcon />, '/panel/products'),
    CreateMenuItem('Conta', <AccountBoxIcon />, '/panel/account'),
  ]

  function AdminButtons() {
    const adminMenu: IMenuItem[] = [
      CreateMenuItem('Usuários', <SupervisedUserCircleIcon />, '/panel/admin/users'),
      CreateMenuItem('Vínculos', <ContactPhoneIcon />, '/panel/admin/accountties'),
    ]

    return (
      <Box>
        <List sx={{ display: 'flex' }}>
          {adminMenu.map((item, index) => (
            <Link key={item.label} to={item.link} component={RouterLink}>
              <ListItem button sx={{ padding: '0.3rem 1rem !important', width: '100%' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    )
  }

  function Menu() {
    return (
      <Box role="presentation" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <List sx={{ display: 'flex' }}>
          {menu.map((item, index) => (
            <Link key={item.label} to={item.link} component={RouterLink}>
              <ListItem button sx={{ padding: '0.3rem 1rem !important', width: '100%' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          ))}
        </List>

        {isAdmin ? <AdminButtons /> : ''}
        <Button
          startIcon={<LogoutIcon />}
          variant="text"
          color="error"
          onClick={logout}
          sx={{
            padding: '0.3rem 1rem !important',
            width: 'fit-content',
          }}
        >
          Sair
        </Button>
      </Box>
    )
  }

  return <Menu />
}
