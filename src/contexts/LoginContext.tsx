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
import { useHistory } from 'react-router-dom'

// Types
import { AccountInterface } from '@type/models/Account'

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
    const cached = localStorage.getItem('account')
    if (cached) setAccount(JSON.parse(cached))
  }, [])

  useEffect(() => {
    localStorage.setItem('account', JSON.stringify(account))
  }, [account])

  function logout() {
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
