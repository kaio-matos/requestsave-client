import { useMutation, UseMutationOptions, useQuery } from 'react-query'

// Services
import { queryClient } from '@services/QueryClient'

// Api
import { Client } from '@api/Client'

// Types
import { APIeditDocumentI, APIErrorI } from '@type/API'
import { GetPagesType, ResponseInterface } from '@type/ResponseType'
import { ClientInterface, IClientForm } from '@type/models/Client'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'

const QUERY_NAME = 'clients'

export function useClientsQuery(pagination?: useQueryGetPaginationType, search = '') {
  return useQuery<GetPagesType<ClientInterface[]>, APIErrorI>(
    [QUERY_NAME, pagination],
    () => Client.getDocument(pagination, search),
    {
      initialData() {
        const cached = queryClient.getQueryData<GetPagesType<ClientInterface[]>>(QUERY_NAME)
        return cached ? cached : { quantity: 25, table: [] }
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}

async function handleClientCreation(data: ClientInterface) {
  queryClient.refetchQueries(QUERY_NAME)
}

export function useClientQueryCreate(
  options?: UseMutationOptions<ResponseInterface<ClientInterface>, APIErrorI, IClientForm>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleClientCreation(data.data)
    }
  } else {
    options = {
      onSuccess: (data, v, c) => {
        handleClientCreation(data.data)
      },
    }
  }

  return useMutation(Client.createDocument, options)
}

async function handleClientDelete(id: string | number) {
  const [[, previousClients]] =
    queryClient.getQueriesData<GetPagesType<ClientInterface[]>>(QUERY_NAME)

  if (previousClients) {
    const nextClients = previousClients.table.filter((product) => product.id !== id)
    queryClient.setQueryData(QUERY_NAME, nextClients)
  }
}

export function useClientQueryDelete(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, { id: number | string }>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleClientDelete(variables.id)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleClientDelete(variables.id)
      },
    }
  }

  return useMutation(Client.deleteDocument, options)
}

async function handleClientEdit(data: APIeditDocumentI) {
  const [[, previousClients]] =
    queryClient.getQueriesData<GetPagesType<ClientInterface[]>>(QUERY_NAME)

  if (previousClients) {
    const nextClients = previousClients
    nextClients.table = previousClients.table.map((product) => {
      if (product.id === data.id) return data as ClientInterface
      else return product
    })

    queryClient.setQueryData(QUERY_NAME, nextClients)
  }
}

export function useClientQueryEdit(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, APIeditDocumentI>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleClientEdit(variables)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleClientEdit(variables)
      },
    }
  }

  const mutation = useMutation(Client.editDocument, options)
  const mutate = mutation.mutate
  const mutateAsync = mutation.mutateAsync

  const removeUndesirablePartsThenMutate = (data: APIeditDocumentI) => {
    const { requests, ...rest } = data as ClientInterface
    return mutate(rest)
  }
  const removeUndesirablePartsThenAsyncMutate = (data: APIeditDocumentI) => {
    const { requests, ...rest } = data as ClientInterface
    return mutateAsync(rest)
  }

  mutation.mutate = removeUndesirablePartsThenMutate
  mutation.mutateAsync = removeUndesirablePartsThenAsyncMutate

  return mutation
}
