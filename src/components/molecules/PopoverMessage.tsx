import { ReactNode, useEffect } from 'react'
import { Alert, PopoverProps, Snackbar } from '@mui/material'

// Types
import { errorInterface } from '@type/Error'
import { useBoolean } from '@hooks/useBoolean'
import { messageInterface } from '@type/Message'

type PopoverMessageType = {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
  miliseconds?: number
  message: messageInterface | undefined
  children: ReactNode
}
export function PopoverMessage({
  message,
  vertical,
  horizontal,
  miliseconds = 3000,
  children,
}: PopoverMessageType) {
  const [show, setShow] = useBoolean(false)

  useEffect(() => {
    if (message && message.message !== '') setShow.on()
  }, [message])

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      onClose={() => setShow.off()}
      autoHideDuration={miliseconds}
      open={show}
    >
      <Alert severity={message?.severity} sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  )
}
