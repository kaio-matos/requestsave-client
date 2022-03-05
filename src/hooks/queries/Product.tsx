import { UseMutateFunction, useMutation, UseMutationOptions, useQuery } from 'react-query'

// Services
import { queryClient } from '@services/QueryClient'

// Types
import { Product } from '@api/Product'

// Types
import { APIeditDocumentI, APIErrorI } from '@type/API'
import { GetPagesType, ResponseInterface } from '@type/ResponseType'
import { IProductForm, ProductInterface } from '@type/models/Product'
import { useQueryGetPaginationType } from '@type/hooks/queries/Query'

const QUERY_NAME = 'products'

/**
 *
 * Pesquisa e fetching de produtos
 *
 */

/** Recebe um array com todos os produtos de forma paginada e filtrado pelo search */
export function useProductsQuery(pagination?: useQueryGetPaginationType, search = '') {
  return useQuery<GetPagesType<ProductInterface[]>, APIErrorI>(
    [QUERY_NAME, pagination],
    () => Product.getDocument(pagination, search),
    {
      refetchOnWindowFocus: false,
      initialData() {
        const cached = queryClient.getQueryData<GetPagesType<ProductInterface[]>>(QUERY_NAME)
        return cached ? cached : { quantity: 25, table: [] }
      },
    }
  )
}

/**
 *
 * Criação de produto
 *
 */
async function handleProductCreation(data: ProductInterface) {
  queryClient.refetchQueries(QUERY_NAME)
}

/** Cria um produto */
export function useProductQueryCreate(
  options?: UseMutationOptions<ResponseInterface<ProductInterface>, APIErrorI, IProductForm>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleProductCreation(data.data)
    }
  } else {
    options = {
      onSuccess: (data, v, c) => {
        handleProductCreation(data.data)
      },
    }
  }

  return useMutation(Product.createDocument, options)
}

/**
 *
 * Exclusão de produto
 *
 */
async function handleProductDelete(id: string | number) {
  const [[, previousProducts]] =
    queryClient.getQueriesData<GetPagesType<ProductInterface[]>>(QUERY_NAME)

  if (previousProducts) {
    const nextProducts = previousProducts
    nextProducts.table = previousProducts.table.filter((product) => product.id !== id)
    queryClient.setQueryData(QUERY_NAME, nextProducts)
  }
}

/** Deleta um produto com seu ID */
export function useProductQueryDelete(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, { id: number | string }>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleProductDelete(variables.id)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleProductDelete(variables.id)
      },
    }
  }

  return useMutation(Product.deleteDocument, options)
}

/**
 *
 * Alteração de produto
 *
 */
async function handleProductEdit(data: APIeditDocumentI) {
  const [[, previousProducts]] =
    queryClient.getQueriesData<GetPagesType<ProductInterface[]>>(QUERY_NAME)

  if (previousProducts) {
    const nextProducts = previousProducts
    nextProducts.table = previousProducts.table.map((product) => {
      if (product.id === data.id) return data as ProductInterface
      else return product
    })

    queryClient.setQueryData(QUERY_NAME, nextProducts)
  }
}

/** Altera um produto com seu ID */
export function useProductQueryEdit(
  options?: UseMutationOptions<ResponseInterface<boolean>, APIErrorI, APIeditDocumentI>
) {
  if (options) {
    const onSuccess = options.onSuccess
    options.onSuccess = (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context)
      handleProductEdit(variables)
    }
  } else {
    options = {
      onSuccess: (d, variables, c) => {
        handleProductEdit(variables)
      },
    }
  }

  const mutation = useMutation(Product.editDocument, options)
  const mutate = mutation.mutate
  const mutateAsync = mutation.mutateAsync

  const removeUndesirablePartsThenMutate = (data: APIeditDocumentI) => {
    const { requests, ...rest } = data as ProductInterface
    return mutate(rest)
  }
  const removeUndesirablePartsThenAsyncMutate = (data: APIeditDocumentI) => {
    const { requests, ...rest } = data as ProductInterface
    return mutateAsync(rest)
  }

  mutation.mutate = removeUndesirablePartsThenMutate
  mutation.mutateAsync = removeUndesirablePartsThenAsyncMutate

  return mutation
}
