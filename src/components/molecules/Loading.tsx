import { Box, CircularProgress } from '@mui/material'

export default function Loading({ loading }: { loading: boolean }) {
  return (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <CircularProgress style={loading ? { opacity: 1 } : { opacity: 0 }} variant="indeterminate" />
    </Box>
  )
}
