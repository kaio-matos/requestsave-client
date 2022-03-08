import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query'

// Services
import { queryClient } from '@services/QueryClient'

// Types
import { Request } from '@api/Request'

// Types
import { APIeditDocumentI, APIErrorI } from '@type/API'
import { GetPagesType, ResponseInterface } from '@type/ResponseType'
import { IRequestForm, RequestType } from '@type/models/Request'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'

const QUERY_NAME = 'requests'

/**
 *
 * Pesquisa e fetching de pedidos
 *
 */

/** Recebe um array com todos os pedidos de forma paginada e filtrado pelo search */
export function useRequestsQuery(
  pagination: useQueryGetPaginationType,
  search = '',
  options?: Omit<UseQueryOptions<GetPagesType<RequestType[]>, APIErrorI>, 'initialData'>
) {
  return useQuery<GetPagesType<RequestType[]>, APIErrorI, GetPagesType<RequestType[]>>(
    [QUERY_NAME, pagination, search],
    () => Request.getDocument(pagination, search),
    {
      initialData: () => {
        const cached = queryClient.getQueryData<GetPagesType<RequestType[]>>(QUERY_NAME)
        return cached ? cached : { quantity: 0, table: [] }
      },

      keepPreviousData: true,
      ...options,
    }
  )
}

export function useRequestsPrefetchQuery(pagination: useQueryGetPaginationType) {
  queryClient.prefetchQuery([QUERY_NAME, pagination], () => Request.getDocument(pagination))
}

/**
 *
 * Criação de pedido
 *
 */

async function handleRequestCreation() {
  queryClient.refetchQueries(QUERY_NAME)
}

/** Cria um pedido */
export function useRequestQueryCreate(
  options?: UseMutationOptions<ResponseInterface<RequestType>, APIErrorI, IRequestForm>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleRequestCreation()
    }
  } else {
    options = {
      onSuccess: (data, v, c) => {
        handleRequestCreation()
      },
    }
  }

  return useMutation(Request.createDocument, options)
}

/**
 *
 * Exclusão de pedido
 *
 */
async function handleRequestDelete(id: string | number) {
  const [[, previousRequests]] = queryClient.getQueriesData<GetPagesType<RequestType[]>>(QUERY_NAME)

  if (previousRequests) {
    const nextRequests = previousRequests
    nextRequests.table = previousRequests.table.filter((request) => request.id !== id)

    queryClient.setQueryData(QUERY_NAME, nextRequests)
  }
}

/** Deleta um pedido com seu ID */
export function useRequestQueryDelete(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, { id: number | string }>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleRequestDelete(variables.id)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleRequestDelete(variables.id)
      },
    }
  }

  return useMutation(Request.deleteDocument, options)
}

/**
 *
 * Alteração de pedido
 *
 */
async function handleRequestEdit(data: APIeditDocumentI) {
  const [[, previousRequests]] = queryClient.getQueriesData<GetPagesType<RequestType[]>>(QUERY_NAME)

  if (previousRequests) {
    const nextRequests = previousRequests
    nextRequests.table = previousRequests.table.map((request) => {
      if (request.id === data.id) return data as RequestType
      else return request
    })
    queryClient.setQueryData(QUERY_NAME, nextRequests)
  }
}

/** Altera um pedido com seu ID */
export function useRequestQueryEdit(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, APIeditDocumentI>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleRequestEdit(variables)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleRequestEdit(variables)
      },
    }
  }

  const mutation = useMutation(Request.editDocument, options)
  const mutate = mutation.mutate
  const mutateAsync = mutation.mutateAsync

  const removeUndesirablePartsThenMutate = (data: APIeditDocumentI) => {
    const { product, client, ...rest } = data as RequestType
    return mutate(rest)
  }
  const removeUndesirablePartsThenAsyncMutate = (data: APIeditDocumentI) => {
    const { product, client, ...rest } = data as RequestType
    return mutateAsync(rest)
  }

  mutation.mutate = removeUndesirablePartsThenMutate
  mutation.mutateAsync = removeUndesirablePartsThenAsyncMutate

  return mutation
}
