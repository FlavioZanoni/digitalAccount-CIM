import type { ROLES } from "../../constants"

export interface BaseEntity {
  id: number
  value: string
  active: boolean
}

export interface IError {
  code: number
  moreInfo: string
  developerMessage: string
  status: number
  messages: string[]
}

export interface Pagination<T> {
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    unpaged: boolean
  }
  size: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  totalElements: number
  totalPages: number
  content: T[]
}

export interface GetApiParams {
  id?: number
  offset: number
  limit: number
  filter?: string
}

export type User = {
  id: number
  name: string
  email: string
  roles: Role[]
};

export type Role = (typeof ROLES)[number]
