// React
import { useEffect } from 'react'
import { Route, useHistory } from 'react-router'

// Thirdparty utils
import Cookies from 'js-cookie'

// Molecules
import Loading from '@components/molecules/Loading'

// Utils
import { Account } from '@api/Account'
import { useMutation } from 'react-query'
import { APIErrorI } from '@type/API'
import { useAccount } from '@contexts/LoginContext'

export function PrivateRoute(props: any) {
  const { children, ...rest } = props
  const token = Cookies.get('token')
  const { logout } = useAccount()

  const { isLoading, isSuccess, mutate } = useMutation(Account.checkJWT, {
    onError: ({ response }: APIErrorI) => logout(),
  })

  useEffect(() => {
    if (token) {
      mutate(token)
    } else {
      logout()
      const error = {
        response: {
          data: {
            code: 'NO_TOKEN',
            meta: {
              cause: 'Não foi encontrado nenhum token',
            },
            status: 400,
          },
        },
      }
    }
  }, [history, token])

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
