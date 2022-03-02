import { APIeditDocumentI, APIErrorI } from '@type/API'
import { ResponseInterface } from '@type/ResponseType'
import { UseMutateAsyncFunction } from 'react-query'

export type useQueryGetPaginationType = {
  page: number
  pageSize: number
}

export type useQueryDeleteMutateType = UseMutateAsyncFunction<
  ResponseInterface<boolean>,
  APIErrorI,
  {
    id: string | number
  },
  unknown
>

export type useQueryEditMutateType = UseMutateAsyncFunction<
  ResponseInterface<boolean>,
  APIErrorI,
  APIeditDocumentI,
  unknown
>
