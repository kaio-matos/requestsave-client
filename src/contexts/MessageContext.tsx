import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { messageInterface } from '@type/Message'

type MessageContextData = {
  message: messageInterface
  setMessage: Dispatch<SetStateAction<messageInterface>>
}

const MessageContext = createContext({} as MessageContextData)

type MessageContextProviderProps = { children: ReactNode }
export function MessageProvider({ children }: MessageContextProviderProps) {
  const [message, setMessage] = useState<messageInterface>({ severity: 'error', message: '' })

  return (
    <MessageContext.Provider value={{ message, setMessage }}>{children}</MessageContext.Provider>
  )
}

export const useGlobalMessage = () => useContext(MessageContext)
