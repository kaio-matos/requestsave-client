// React
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'

// Services
import { API } from '@services/API'

// Types
import { AccountInterface } from '@type/models/Account'
import { useHistory } from 'react-router-dom'

type AccountContextData = {
  account: AccountInterface
  setAccount: Dispatch<SetStateAction<AccountInterface>>
  login: (data: AccountInterface) => void
  logout: () => void
}

const LoginContext = createContext({} as AccountContextData)

type LoginContextProviderProps = { children: ReactNode }
export function LoginProvider({ children }: LoginContextProviderProps) {
  const [account, setAccount] = useState({} as AccountInterface)
  const history = useHistory()

  useEffect(() => {
    function setAccountWhenChange() {
      const cached = localStorage.getItem('account')
      if (cached) setAccount(JSON.parse(cached))
    }

    window.addEventListener('storage', setAccountWhenChange)
    return () => window.removeEventListener('storage', setAccountWhenChange)
  }, [])

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) return

    // Set axios api with authorization-token
    API.defaults.headers.common['authorization-token'] = token
  }, [Cookies.get('token')])

  useEffect(() => localStorage.setItem('account', JSON.stringify(account)), [account])

  function logout() {
    Cookies.remove('token')
    Cookies.remove('role')
    localStorage.removeItem('account')
    history.push('/login')
  }

  function login(data: AccountInterface) {
    if (!data) return
    setAccount(data)
    history.push('/panel')
  }

  return (
    <LoginContext.Provider value={{ account, setAccount, logout, login }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useAccount = () => useContext(LoginContext)
