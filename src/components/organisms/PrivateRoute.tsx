// React
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { Route } from 'react-router'

// Molecules
import Loading from '@components/molecules/Loading'

// Utils
import { Account } from '@api/Account'

// Contexts
import { useAccount } from '@contexts/LoginContext'
import { useGlobalMessage } from '@contexts/MessageContext'

// Type
import { APIErrorI } from '@type/API'

export function PrivateRoute(props: any) {
  const { logout } = useAccount()
  const { setMessage } = useGlobalMessage()

  const { children, ...rest } = props

  const { isLoading, isSuccess, mutate } = useMutation(Account.checkJWT, {
    onError: ({ response }: APIErrorI) => {
      logout()
      setMessage({
        severity: 'error',
        message: response.data.meta.cause,
      })
    },
  })

  useEffect(() => {
    mutate()
  }, [history])

  function renderComponents({ location }: { location: any }) {
    return (
      <>
        {isLoading ? <Loading loading={isLoading} /> : ''}
        {isSuccess && !isLoading ? children : ''}
      </>
    )
  }

  return <Route {...rest}>{renderComponents}</Route>
}
