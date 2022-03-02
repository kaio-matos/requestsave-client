// Molecules
import { GridColDef } from '@mui/x-data-grid'
import GridActionsCell from '@components/molecules/Grid/GridActionsCell'
import GridToolTip from '@components/molecules/Grid/GridToolTip'

// Utils
import { ROLES_ARRAY } from '@utils/constants'
import { formatDate } from '@utils/formatDate'

// Types
import { useQueryDeleteMutateType, useQueryEditMutateType } from '@type/hooks/queries/Query'
import { AccountTieGetInterface } from '@type/models/AccountTie'

// Validations
import AccountValidate from '@validations/AccountValidate'

type getUserCollumnsType = {
  accountTies: AccountTieGetInterface[]
  deleteUser: useQueryDeleteMutateType
  editUser: useQueryEditMutateType
}

export function getUserCollumns({ accountTies, deleteUser, editUser }: getUserCollumnsType) {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: '#', minWidth: 100, flex: 1, hide: true, filterable: false },

    // Primeiro nome
    {
      field: 'firstName',
      headerName: 'Nome',
      flex: 1,
      renderCell: GridToolTip,
    },

    // Último nome
    {
      field: 'lastName',
      headerName: 'Sobrenome',
      flex: 1,
      renderCell: GridToolTip,
    },

    // Email
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: GridToolTip,
    },

    // Vínculo
    {
      field: 'accountTie_id',
      headerName: 'Vínculo',
      type: 'singleSelect',
      flex: 1,
      editable: true,

      valueFormatter: (params) =>
        accountTies.find(({ id }) => id === params.value)?.phoneNumber || '',

      renderCell: (params) => <GridToolTip value={params.formattedValue} />,
      valueOptions: (params) => {
        const filtered = accountTies.filter((accountTie) => {
          if (!accountTie.account || params.row?.accountTie_id === accountTie.id) return accountTie
        })

        return filtered.map((accountTie) => ({
          value: accountTie.id,
          label: accountTie.phoneNumber,
        }))
      },
    },

    // Email confirmado
    {
      field: 'confirmedEmail',
      headerName: 'Confirmou email',
      flex: 1,
      renderCell: (params) => <GridToolTip value={params.formattedValue} />,
      valueFormatter: ({ value }) => {
        if (Boolean(value)) return 'Confirmado'
        return 'Não confirmado'
      },
    },

    // Criado em
    {
      field: 'createdAt',
      headerName: 'Adicionado em',
      type: 'date',
      flex: 1,
      valueFormatter: (params) => formatDate(params.value as Date),
      renderCell: (params) => <GridToolTip value={params.formattedValue} />,
    },

    // Cargo
    {
      field: 'role',
      headerName: 'Cargo',
      type: 'singleSelect',
      description: 'Condição do pedido',
      flex: 1,
      editable: true,

      renderCell: (params) => <GridToolTip value={params.formattedValue} />,
      valueFormatter: ({ value }) => {
        // Transformamos o valor em código para o valor escrito
        const role = ROLES_ARRAY.find((role) => role.code === value)
        return role?.type
      },
      valueOptions: ROLES_ARRAY.map(({ code, type }) => ({ value: code, label: type })),
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
      disableColumnMenu: true,
      disableReorder: true,
      renderCell: (props) => (
        <GridActionsCell
          validations={{
            deleteValidation: AccountValidate.delete,
            editValidation: AccountValidate.edit,
          }}
          editDocument={editUser}
          deleteDocument={deleteUser}
          {...props}
        />
      ),
    },
  ]

  return columns
}
