// React
import { useEffect } from 'react'
import { Route, useHistory } from 'react-router'

// Hooks
import { useBoolean } from '@hooks/useBoolean'
import { useAccount } from '@contexts/LoginContext'

// Utils
import { ROLES } from '@utils/constants'

export function AdminRoute(props: any) {
  const [success, setSuccess] = useBoolean(false)
  const { account } = useAccount()

  const history = useHistory()
  const { children, ...rest } = props

  useEffect(() => {
    async function verifyRole() {
      if (account?.role) {
        if (account?.role === ROLES.ADMIN) {
          setSuccess.on()
        } else {
          setSuccess.off()
          history.push('/panel')
        }
      } else {
        setSuccess.off()
        history.push('/login')
      }
    }
    verifyRole()
  }, [history, account?.role])

  function renderComponents({ location }: { location: any }) {
    return <>{success ? children : ''}</>
  }

  return <Route {...rest}>{renderComponents}</Route>
}
