import { useEffect } from 'react'
import { Alert, Snackbar } from '@mui/material'

// Types
import { errorInterface } from '@type/Error'
import { useBoolean } from '@hooks/useBoolean'

export function PopoverError({
  error,
  vertical,
  horizontal,
  miliseconds,
}: {
  error: errorInterface | undefined
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
  miliseconds: number
}) {
  const [show, setShow] = useBoolean(false)

  useEffect(() => {
    if (error && error.show) setShow.on()
  }, [error])

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      onClose={() => setShow.off()}
      autoHideDuration={miliseconds}
      open={show}
    >
      <Alert severity="error" sx={{ width: '100%' }}>
        {error?.message}
      </Alert>
    </Snackbar>
  )
}
