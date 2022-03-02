import { useMutation, UseMutationOptions, useQuery } from 'react-query'

// Services
import { queryClient } from '@services/QueryClient'

// Api
import { Admin } from '@api/Admin'

// Types
import { APIeditDocumentI, APIErrorI } from '@type/API'
import { GetPagesType, ResponseInterface } from '@type/ResponseType'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'
import { UserGetInterface, UserInterface } from '@type/models/Account'

const QUERY_NAME = 'admin-user'

export function useAdminUserQuery(pagination?: useQueryGetPaginationType, search = '') {
  return useQuery<GetPagesType<UserGetInterface[]>, APIErrorI>(
    [QUERY_NAME, pagination],
    () => Admin.User.get(pagination, search),
    {
      initialData() {
        const cached = queryClient.getQueryData<GetPagesType<UserGetInterface[]>>(QUERY_NAME)
        return cached ? cached : { quantity: 25, table: [] }
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}

async function handleAdminUserDelete(id: string | number) {
  const [[, previousUsers]] =
    queryClient.getQueriesData<GetPagesType<UserGetInterface[]>>(QUERY_NAME)

  if (previousUsers) {
    const nextUsers = previousUsers.table.filter((account) => account.id !== id)
    queryClient.setQueryData(QUERY_NAME, nextUsers)
  }
}

export function useAdminUserQueryDelete(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, { id: number | string }>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleAdminUserDelete(variables.id)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleAdminUserDelete(variables.id)
      },
    }
  }

  return useMutation(Admin.User.delete, options)
}

async function handleAdminUserEdit(data: APIeditDocumentI) {
  const [[, previousUsers]] = queryClient.getQueriesData<GetPagesType<UserInterface[]>>(QUERY_NAME)

  if (previousUsers) {
    const nextUsers = previousUsers
    nextUsers.table = previousUsers.table.map((product) => {
      if (product.id === data.id) return data as UserInterface
      else return product
    })

    queryClient.setQueryData(QUERY_NAME, nextUsers)
  }
}

export function useAdminUserQueryEdit(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, APIeditDocumentI>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleAdminUserEdit(variables)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleAdminUserEdit(variables)
      },
    }
  }

  const mutation = useMutation(Admin.User.editRole, options)
  const mutate = mutation.mutate
  const mutateAsync = mutation.mutateAsync

  const removeUndesirablePartsThenMutate = (data: APIeditDocumentI) => {
    const { id, role, accountTie_id } = data as UserGetInterface
    return mutate({ id, role, accountTie_id })
  }

  const removeUndesirablePartsThenAsyncMutate = (data: APIeditDocumentI) => {
    const { id, role, accountTie_id } = data as UserGetInterface
    return mutateAsync({ id, role, accountTie_id })
  }

  mutation.mutate = removeUndesirablePartsThenMutate
  mutation.mutateAsync = removeUndesirablePartsThenAsyncMutate

  return mutation
}
