// Molecules
import { GridColDef } from '@mui/x-data-grid'
import GridActionsCell from '@components/molecules/Grid/GridActionsCell'
import GridToolTip from '@components/molecules/Grid/GridToolTip'
import { PhoneNumberFormatEdit } from '@components/molecules/Grid/PhoneNumberFormat'

// Types
import { useQueryDeleteMutateType, useQueryEditMutateType } from '@type/hooks/queries/Query'

// Utils
import { formatDate } from '@utils/formatDate'
import { AccountInterface } from '@type/models/Account'
import AccountTieValidate from '@validations/AccountTieValidate'

type getAccountTieCollumnsType = {
  deleteAccountTie: useQueryDeleteMutateType
  editAccountTie: useQueryEditMutateType
}

export function getAccountTieCollumns({
  deleteAccountTie,
  editAccountTie,
}: getAccountTieCollumnsType) {
  const columns: GridColDef[] = [
    {
      field: 'phoneNumber',
      headerName: 'Número de telefone',
      flex: 1,
      editable: true,

      renderCell: GridToolTip,
      renderEditCell: PhoneNumberFormatEdit,
      headerAlign: 'left',
      align: 'left',
    },

    // Nome
    {
      field: 'account',
      headerName: 'Nome | Email',
      description: 'Nome e email do usuário vinculado a este número',
      flex: 1,

      valueFormatter: (params) => {
        const account = params.value as Omit<AccountInterface, 'role'> | undefined
        if (!account) return 'Nenhuma conta vinculada'
        return `${account.firstName} ${account.lastName} | ${account.email}`
      },
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

    {
      field: 'actions',
      headerName: 'Ações',
      width: 75,
      headerAlign: 'center',
      align: 'center',

      filterable: false,
      disableExport: true,
      sortable: false,
      disableColumnMenu: true,
      disableReorder: true,
      renderCell: (props) => (
        <GridActionsCell
          validations={{
            deleteValidation: AccountTieValidate.delete,
            editValidation: AccountTieValidate.edit,
          }}
          editDocument={editAccountTie}
          deleteDocument={deleteAccountTie}
          {...props}
        />
      ),
    },
  ]

  return columns
}
