import { useMutation, UseMutationOptions, useQuery } from 'react-query'

// Services
import { queryClient } from '@services/QueryClient'

// Api
import { Admin } from '@api/Admin'

// Types
import { APIeditDocumentI, APIErrorI } from '@type/API'
import { GetPagesType, ResponseInterface } from '@type/ResponseType'
import {
  AccountTieFormInterface,
  AccountTieGetInterface,
  AccountTieInterface,
} from '@type/models/AccountTie'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'

const QUERY_NAME = 'admin-accountie'

/**
 *
 * Pesquisa e fetching de vínculos
 *
 */

/** Recebe um array com todos os vínculos de forma paginada e filtrado pelo search */
export function useAdminAccountTiesQuery(pagination?: useQueryGetPaginationType, search = '') {
  return useQuery<GetPagesType<AccountTieGetInterface[]>, APIErrorI>(
    [QUERY_NAME, pagination],
    () => Admin.AccountTie.get(pagination, search),
    {
      refetchOnWindowFocus: false,
      initialData() {
        const cached = queryClient.getQueryData<GetPagesType<AccountTieGetInterface[]>>(QUERY_NAME)
        return cached ? cached : { quantity: 25, table: [] }
      },
    }
  )
}

/**
 *
 * Criação de vínculo
 *
 */
async function handleAccountTieCreation() {
  queryClient.refetchQueries(QUERY_NAME)
}

/** Cria um vínculo */
export function useAdminAccountTieQueryCreate(
  options?: UseMutationOptions<
    ResponseInterface<AccountTieInterface>,
    APIErrorI,
    AccountTieFormInterface
  >
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleAccountTieCreation()
    }
  } else {
    options = {
      onSuccess: (data, v, c) => {
        handleAccountTieCreation()
      },
    }
  }

  return useMutation(Admin.AccountTie.create, options)
}

/**
 *
 * Exclusão de vínculo
 *
 */
async function handleAccountTieDelete(id: string | number) {
  const [[, previousAccountTies]] =
    queryClient.getQueriesData<GetPagesType<AccountTieInterface[]>>(QUERY_NAME)

  if (previousAccountTies) {
    const nextAccountTies = previousAccountTies
    nextAccountTies.table = previousAccountTies.table.filter((product) => product.id !== id)
    queryClient.setQueryData(QUERY_NAME, nextAccountTies)
  }
}

/** Deleta um vínculo com seu ID */
export function useAdminAccountTieQueryDelete(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, { id: number | string }>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleAccountTieDelete(variables.id)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleAccountTieDelete(variables.id)
      },
    }
  }

  return useMutation(Admin.AccountTie.delete, options)
}

/**
 *
 * Alteração de vínculo
 *
 */
async function handleAccountTieEdit(data: APIeditDocumentI) {
  const [[, previousAccountTies]] =
    queryClient.getQueriesData<GetPagesType<AccountTieGetInterface[]>>(QUERY_NAME)

  if (previousAccountTies) {
    const nextAccountTies = previousAccountTies
    nextAccountTies.table = previousAccountTies.table.map((product) => {
      if (product.id === data.id) return data as AccountTieGetInterface
      else return product
    })

    queryClient.setQueryData(QUERY_NAME, nextAccountTies)
  }
}

/** Altera um vínculo com seu ID */
export function useAdminAccountTieQueryEdit(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, APIeditDocumentI>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleAccountTieEdit(variables)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleAccountTieEdit(variables)
      },
    }
  }

  const mutation = useMutation(Admin.AccountTie.edit, options)
  const mutate = mutation.mutate
  const mutateAsync = mutation.mutateAsync

  const removeUndesirablePartsThenMutate = (data: APIeditDocumentI) => {
    const { account, ...rest } = data as AccountTieGetInterface
    return mutate(rest)
  }
  const removeUndesirablePartsThenAsyncMutate = (data: APIeditDocumentI) => {
    const { account, ...rest } = data as AccountTieGetInterface
    return mutateAsync(rest)
  }

  mutation.mutate = removeUndesirablePartsThenMutate
  mutation.mutateAsync = removeUndesirablePartsThenAsyncMutate

  return mutation
}
