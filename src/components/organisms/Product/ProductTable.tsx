// React
import { useState, useEffect } from 'react'

// Material
import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { ptBR } from '@mui/material/locale'

// Molecules
import LinearLoadingGrid from '@components/molecules/Grid/LinearLoadingGrid'
import GridExtendedToolbar from '@components/molecules/Grid/GridExtendedToolbar'

// Utils - Contexts
import { localeTableTranslationPTBR } from '@utils/constants'

// Hooks
import {
  useProductQueryDelete,
  useProductQueryEdit,
  useProductsQuery,
} from '@hooks/queries/Product'
import { RowsStateType } from '@type/table/RowsState'
import { ProductInterface } from '@type/models/Product'
import { useGlobalMessage } from '@contexts/MessageContext'

// Columns
import { getProductCollumns } from './productColumns'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR
)

export default function ProductTable() {
  const [rows, setRows] = useState<ProductInterface[]>([])
  const [rowsState, setRowsState] = useState<RowsStateType>({ page: 0, pageSize: 25, rowCount: 0 })
  const [search, setSearch] = useState('')

  const { setMessage } = useGlobalMessage()

  const nextPage = {
    page: rowsState.page,
    pageSize: rowsState.pageSize,
  }

  const { data, isFetching, error } = useProductsQuery(nextPage, search)
  const { mutateAsync: deleteProduct, isLoading: loadingDelete } = useProductQueryDelete()
  const { mutateAsync: editProduct, isLoading: loadingEdit } = useProductQueryEdit()

  const columns = getProductCollumns({ deleteProduct, editProduct })

  useEffect(() => {
    if (!data) return
    setRows(data.table)
    setRowsState((prev) => ({ ...prev, rowCount: data.quantity }))
  }, [data])

  useEffect(() => {
    error && setMessage({ message: error.response.data.meta.cause, severity: 'error' })
  }, [error])

  return (
    <Box height="90vh" width="100%" sx={{ flexGrow: 3 }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          {...rowsState}
          rows={rows}
          columns={columns}
          pagination
          paginationMode="server"
          onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
          onPageSizeChange={(pageSize) => setRowsState((prev) => ({ ...prev, pageSize }))}
          disableSelectionOnClick
          editMode="row"
          // Previne o efeito de iniciar a edição apenas clicando em algum dado
          onRowEditStart={(params, event) => {
            event.defaultMuiPrevented = true
          }}
          onRowEditStop={(params, event) => {
            event.defaultMuiPrevented = true
          }}
          components={{
            Toolbar: GridExtendedToolbar,
            LoadingOverlay: LinearLoadingGrid,
          }}
          componentsProps={{
            toolbar: {
              value: search,
              handleSearch: (value: string) => setSearch(value),
              clearSearch: () => setSearch(''),
            },
          }}
          loading={isFetching || loadingDelete || loadingEdit}
          localeText={localeTableTranslationPTBR}
        />
      </ThemeProvider>
    </Box>
  )
}
