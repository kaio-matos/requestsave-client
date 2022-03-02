// React
import { useState, useEffect } from 'react'
import { Route, useHistory } from 'react-router'

// Thirdparty utils
import Cookies from 'js-cookie'

// Hooks
import { useBoolean } from '@hooks/useBoolean'

// Utils
import { ROLES } from '@utils/constants'

export function AdminRoute(props: any) {
  const { children, ...rest } = props
  const role = Cookies.get('role')
  const [success, setSuccess] = useBoolean(false)
  const history = useHistory()

  useEffect(() => {
    async function verifyRole() {
      if (role) {
        if (role === ROLES.ADMIN) {
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
  }, [history, role])

  function renderComponents({ location }: { location: any }) {
    return <>{success ? children : ''}</>
  }

  return <Route {...rest}>{renderComponents}</Route>
}
