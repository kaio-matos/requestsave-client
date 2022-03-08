// React
import { useState, useEffect } from 'react'

// Material
import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { ptBR } from '@mui/material/locale'

// Molecules
import LinearLoadingGrid from '@components/molecules/Grid/LinearLoadingGrid'
import GridExtendedToolbar from '@components/molecules/Grid/GridExtendedToolbar'

// Utils - Contexts
import { localeTableTranslationPTBR, STATUS, STATUS_ARRAY } from '@utils/constants'

// Hooks
import {
  useRequestQueryDelete,
  useRequestQueryEdit,
  useRequestsPrefetchQuery,
  useRequestsQuery,
} from '@hooks/queries/Request'
import { useClientsQuery } from '@hooks/queries/Client'
import { useProductsQuery } from '@hooks/queries/Product'
import { useGlobalMessage } from '@contexts/MessageContext'

// Types
import { RequestType } from '@type/models/Request'
import { RowsStateType } from '@type/table/RowsState'

// Columns
import { getRequestCollumns } from './requestColumns'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR
)

export default function RequestsTable() {
  const [rows, setRows] = useState<RequestType[]>([])
  const [rowsState, setRowsState] = useState<RowsStateType>({ page: 0, pageSize: 25, rowCount: 0 })
  const [search, setSearch] = useState('')

  const { setMessage } = useGlobalMessage()

  const currentPage = {
    page: rowsState.page,
    pageSize: rowsState.pageSize,
  }

  const { error, data, isFetching } = useRequestsQuery(currentPage, search, {
    onSuccess: (data) => {
      setRows(data.table)
      setRowsState((prev) => ({ ...prev, rowCount: data.quantity }))
    },
  })

  const { data: clients } = useClientsQuery()
  const { data: products } = useProductsQuery()

  const { mutateAsync: deleteRequest, isLoading: loadingDelete } = useRequestQueryDelete()
  const { mutateAsync: editRequest, isLoading: loadingEdit } = useRequestQueryEdit()

  const columns = getRequestCollumns({
    clients: clients?.table || [],
    products: products?.table || [],
    deleteRequest,
    editRequest,
  })

  useEffect(() => {
    !isFetching && useRequestsPrefetchQuery(currentPage)
    data && setRows(data.table)
  }, [rowsState.page, rowsState.pageSize])

  useEffect(() => {
    error && setMessage({ message: error.response.data.meta.cause, severity: 'error' })
  }, [error])

  /**
   *  Adicionamos classes para a adição de cores dependendo da situação atual do pedido
   *  Classes:
   *  ** 'status_{{code}}'
   *  ** 'expired_request'
   *  ** 'warning_request'
   *
   */
  const addRowClasses = (params: GridRowParams) => {
    const expiresIn = new Date(params.row.expiresIn)
    const status = params.row.status
    const now = new Date()
    let statusClass = ''
    let expiredClass = ''
    let warningClass = ''

    // Se foi nos meses anteriores já expirou
    if (expiresIn.getMonth() < now.getMonth()) {
      expiredClass = 'expired_request'

      // Se estiver no mesmo mês
    } else if (expiresIn.getMonth() === now.getMonth()) {
      // Se foi nos dias anteriores deste mês já expirou
      if (expiresIn.getDate() < now.getDate()) {
        expiredClass = 'expired_request'

        // Se for hoje
      } else if (expiresIn.getDate() === now.getDate()) {
        warningClass = 'warning_request'
      }
    }
    switch (status) {
      case STATUS.TODO:
        statusClass = 'status_' + STATUS.TODO
        break
      case STATUS.GRAPHIC:
        statusClass = 'status_' + STATUS.GRAPHIC
        break
      case STATUS.DEALING:
        statusClass = 'status_' + STATUS.DEALING
        break
      case STATUS.CANCELLED:
        statusClass = 'status_' + STATUS.CANCELLED
        break
      case STATUS.COMPLETED:
        statusClass = 'status_' + STATUS.COMPLETED
        break
      default:
        statusClass = ''
    }

    return `${statusClass} ${expiredClass} ${warningClass}`
  }

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
          getRowClassName={addRowClasses}
          disableSelectionOnClick
        />
      </ThemeProvider>
    </Box>
  )
}
