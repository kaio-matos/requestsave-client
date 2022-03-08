// Molecules
import { GridColDef } from '@mui/x-data-grid'
import { MenuItem } from '@mui/material'
import GridActionsCell from '@components/molecules/Grid/GridActionsCell'
import LongMenu from '@components/molecules/Grid/LongMenu'
import GridToolTip from '@components/molecules/Grid/GridToolTip'

// Types
import { useQueryDeleteMutateType, useQueryEditMutateType } from '@type/hooks/queries/Query'

// Utils
import { formatDate } from '@utils/formatDate'

// Validations
import ClientValidate from '@validations/ClientValidate'

type getRequestCollumnsType = {
  deleteClient: useQueryDeleteMutateType
  editClient: useQueryEditMutateType
}

export function getClientCollumns({ deleteClient, editClient }: getRequestCollumnsType) {
  const columns: GridColDef[] = [
    // Nome
    {
      field: 'name',
      headerName: 'Cliente',
      description: 'Nome do cliente',
      filterable: false,
      editable: true,
      flex: 1,
      renderCell: GridToolTip,
    },

    // Email
    {
      field: 'email',
      headerName: 'Email',
      description: 'Email do cliente',
      editable: true,
      flex: 1,
      renderCell: GridToolTip,
    },

    // Pedidos
    {
      field: 'requests',
      headerName: 'Pedidos',
      description: 'Pedidos do cliente',
      align: 'right',
      filterable: false,
      flex: 1,

      valueFormatter: (params) => {
        // Transformamos o array em uma lista string como -> "item, item, item" para ao exportar em CSV saia esse valor
        const requests = params.value as [{ id: string; title: string }]
        let items = ''

        requests?.forEach((req, index) => {
          if (requests[index].title === requests[requests.length - 1].title) {
            items += req.title
          } else {
            items += req.title + ', '
          }
        })

        return items
      },
      renderCell: (params) => (
        <LongMenu>
          {params?.row?.requests?.map((req: { title: string; id: string }) => {
            return (
              <MenuItem key={req.id}>
                <GridToolTip value={req.title} />
              </MenuItem>
            )
          })}
        </LongMenu>
      ),
    },

    // Criado em
    {
      field: 'createdAt',
      headerName: 'Adicionado em',
      type: 'date',
      editable: true,
      valueFormatter: (params) => formatDate(params.value as Date),
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
      description: 'Data de criação do cliente',
      flex: 1,
    },

    // Ações
    {
      field: 'actions',
      headerName: 'Ações',
      headerAlign: 'center',
      align: 'center',
      width: 75,

      sortable: false,
      filterable: false,
      disableExport: true,
      disableColumnMenu: true,
      disableReorder: true,
      renderCell: (props) => (
        <GridActionsCell
          validations={{
            deleteValidation: ClientValidate.delete,
            editValidation: ClientValidate.edit,
          }}
          editDocument={editClient}
          deleteDocument={deleteClient}
          {...props}
        />
      ),
    },
  ]

  return columns
}
