// Molecules
import { GridColDef } from '@mui/x-data-grid'
import GridActionsCell from '@components/molecules/Grid/GridActionsCell'
import GridToolTip from '@components/molecules/Grid/GridToolTip'
import { currencyBRLformatter, MoneyFormatEdit } from '@components/molecules/Grid/MoneyFormat'

// Types
import { useQueryDeleteMutateType, useQueryEditMutateType } from '@type/hooks/queries/Query'

// Utils
import { formatDate } from '@utils/formatDate'
import ProductValidate from '@validations/ProductValidate'

type getProductCollumnsType = {
  deleteProduct: useQueryDeleteMutateType
  editProduct: useQueryEditMutateType
}

export function getProductCollumns({ deleteProduct, editProduct }: getProductCollumnsType) {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: '#', minWidth: 100, flex: 1, hide: true, filterable: false },
    // Nome
    {
      field: 'name',
      headerName: 'Produto',
      flex: 1,
      editable: true,
      renderCell: GridToolTip,
    },

    // Preço base
    {
      field: 'basePrice',
      headerName: 'Preço base R$',
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      editable: true,

      valueFormatter: ({ value }) => currencyBRLformatter.format(Number(value)),
      renderEditCell: MoneyFormatEdit,
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
    },

    // Criado em
    {
      field: 'createdAt',
      headerName: 'Adicionado em',
      valueFormatter: (params) => formatDate(params.value as Date),
      renderCell: ({ formattedValue }) => <GridToolTip value={formattedValue} />,
      type: 'date',
      flex: 1,
      editable: true,
    },

    // Ações
    {
      field: 'actions',
      headerName: 'Ações',
      align: 'center',
      headerAlign: 'center',
      width: 75,

      sortable: false,
      filterable: false,
      disableExport: true,
      disableColumnMenu: true,
      disableReorder: true,
      renderCell: (props) => (
        <GridActionsCell
          validations={{
            deleteValidation: ProductValidate.delete,
            editValidation: ProductValidate.edit,
          }}
          editDocument={editProduct}
          deleteDocument={deleteProduct}
          {...props}
        />
      ),
    },
  ]

  return columns
}
