import { Alert } from '@mui/material'
import { useEffect } from 'react'
import { useBoolean } from '@hooks/useBoolean'

// Types
import { errorInterface } from '@type/Error'

export const standardError = {
  message: '',
  show: false,
}

export function DisplayError({ error }: { error: errorInterface | undefined }) {
  const [show, setShow] = useBoolean(false)
  const TIMEOUT = 5000

  useEffect(() => {
    if (error && error.show) {
      if (show === false) {
        setShow.on()
        setTimeout(() => {
          setShow.off()
        }, TIMEOUT)
      }
    }
  }, [error])

  return (
    <Alert style={show ? { opacity: 1 } : { opacity: 0 }} severity="error">
      {show ? error?.message : '_________'}
    </Alert>
  )
}
