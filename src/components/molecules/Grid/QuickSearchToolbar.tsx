import { useState, useEffect } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid'
import ClearIcon from '@mui/icons-material/Clear'

interface QuickSearchToolbarProps {
  clearSearch: () => void
  handleSearch: (value: string) => void
  value: string
}

export function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <Box sx={{ p: 0.5, pb: 0 }}>
      <TextField
        variant="standard"
        placeholder="Pesquisar..."
        autoComplete="off"
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter') props.handleSearch(value)
        }}
        onChange={(e) => setValue(e.currentTarget.value)}
        InputProps={{
          endAdornment: (
            <>
              <IconButton
                title="Apagar"
                aria-label="Apagar"
                size="small"
                style={{ visibility: value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
              <IconButton
                title="Pesquisar"
                aria-label="Pesquisar"
                size="small"
                onClick={() => props.handleSearch(value)}
              >
                <GridSearchIcon fontSize="small" />
              </IconButton>
            </>
          ),
        }}
        sx={{
          width: { xs: 1, sm: 'auto' },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
          '& .MuiInput-underline:hover:before': {
            borderColor: 'divider',
          },
        }}
      />
    </Box>
  )
}
