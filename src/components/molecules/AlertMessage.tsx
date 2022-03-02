import { Alert, AlertProps } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useBoolean } from '@hooks/useBoolean'

// Types
import { messageInterface } from '@type/Message'

export const standardError = {
  message: '',
  show: false,
}

type AlertMessageType = {
  message: messageInterface | undefined
  children: ReactNode
} & AlertProps

export function AlertMessage({ message, children, ...props }: AlertMessageType) {
  const [show, setShow] = useBoolean(false)
  const TIMEOUT = 5000

  useEffect(() => {
    if (!message?.message) return
    if (show !== false) return

    setShow.on()
    const timeout = setTimeout(() => {
      setShow.off()
    }, TIMEOUT)

    return () => clearTimeout(timeout)
  }, [message])

  return (
    <Alert {...props} style={show ? { opacity: 1 } : { opacity: 0 }} severity={message?.severity}>
      {children}
    </Alert>
  )
}
