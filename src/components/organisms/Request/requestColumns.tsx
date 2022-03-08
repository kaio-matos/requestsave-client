// Molecules
import { GridColDef } from '@mui/x-data-grid'
import GridActionsCell from '@components/molecules/Grid/GridActionsCell'
import GridToolTip from '@components/molecules/Grid/GridToolTip'
import { currencyBRLformatter, MoneyFormatEdit } from '@components/molecules/Grid/MoneyFormat'

// Utils
import { STATUS_ARRAY } from '@utils/constants'
import { formatDate } from '@utils/formatDate'

// Types
import { useQueryDeleteMutateType, useQueryEditMutateType } from '@type/hooks/queries/Query'
import { ClientInterface } from '@type/models/Client'
import { ProductInterface } from '@type/models/Product'

// Validations
import RequestValidate from '@validations/RequestValidate'

type getRequestCollumnsType = {
  clients: ClientInterface[]
  products: ProductInterface[]
  deleteRequest: useQueryDeleteMutateType
  editRequest: useQueryEditMutateType
}

export function getRequestCollumns({
  clients,
  products,
  deleteRequest,
  editRequest,
}: getRequestCollumnsType) {
  const columns: GridColDef[] = [
    // Título
    {
      field: 'title',
      headerName: 'Título',
      description: 'Título do pedido',
      editable: true,
      filterable: false,
      minWidth: 140,
      flex: 1,
      renderCell: GridToolTip,
    },

    // Cliente
    {
      field: 'client_id',
      headerName: 'Cliente',
      type: 'singleSelect',
      description: 'Cliente que fez o pedido',
      flex: 1,
      editable: true,

      valueFormatter: (params) => clients.find(({ id }) => id === params.value)?.name || '',
      renderCell: (params) => <GridToolTip value={params.formattedValue} />,
      valueOptions: clients.map(({ id, name }) => ({ value: id, label: name })),
    },

    // Produto
    {
      field: 'product_id',
      headerName: 'Produto',
      type: 'singleSelect',
      description: 'Produto escolhido pelo cliente',
      flex: 1,
      editable: true,

      valueFormatter: (params) => products.find(({ id }) => id === params.value)?.name || '',
      renderCell: (params) => <GridToolTip value={params.formattedValue} />,
      valueOptions: products.map(({ id, name }) => ({ value: id, label: name })),
    },

    // Criado em
    {
      field: 'createdAt',
      headerName: 'Início',
      type: 'date',
      description: 'Data de criação do pedido',
      hide: true,
      editable: true,
      flex: 1,
      valueFormatter: (params) => formatDate(params.value as Date),
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
    },

    // Expira em
    {
      field: 'expiresIn',
      headerName: 'Final',
      type: 'date',
      description: 'Prazo final do pedido',
      // minWidth: 155,
      flex: 1,
      editable: true,
      valueFormatter: (params) => formatDate(params.value as Date),
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
    },

    // Preço
    {
      field: 'price',
      headerName: 'Preço',
      type: 'number',
      description: 'Preço cobrado',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      editable: true,

      renderEditCell: MoneyFormatEdit,
      valueFormatter: ({ value }) => currencyBRLformatter.format(Number(value)),
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
    },

    // Pago
    {
      field: 'paidOut',
      headerName: 'Pago',
      type: 'number',
      description: 'Valor adiantado pelo cliente',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      editable: true,

      renderEditCell: MoneyFormatEdit,
      valueFormatter: ({ value }) => currencyBRLformatter.format(Number(value)),
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
    },

    // Saldo
    {
      field: 'balance',
      headerName: 'Saldo',
      type: 'number',
      description: 'Valor que ainda falta ser pago',
      headerAlign: 'left',
      align: 'left',
      flex: 1,

      valueFormatter: ({ value }) => currencyBRLformatter.format(Number(value)),
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
    },

    // Status
    {
      field: 'status',
      headerName: 'Status',
      type: 'singleSelect',
      description: 'Condição do pedido',
      flex: 1,
      editable: true,

      valueFormatter: (params) => {
        // Transformamos o valor em código para o valor escrito
        const value = params.value

        const status = STATUS_ARRAY.find((st) => st.code === value)
        const type = status ? status.type : 'A fazer'
        return type
      },
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
      valueOptions: STATUS_ARRAY.map(({ code, type }) => ({ value: code, label: type })),
    },

    // Ações
    {
      field: 'actions',
      headerName: 'Ações',
      width: 75,
      headerAlign: 'center',
      align: 'center',
      disableExport: true,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,

      renderCell: (props) => (
        <GridActionsCell
          validations={{
            deleteValidation: RequestValidate.delete,
            editValidation: RequestValidate.edit,
          }}
          editDocument={editRequest}
          deleteDocument={deleteRequest}
          {...props}
        />
      ),
    },
  ]

  return columns
}
