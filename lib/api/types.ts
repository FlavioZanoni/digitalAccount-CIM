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
  number: number
  totalElements: number
  size: number
  totalPages: number
  content: T[]
}

export interface GetApiParams {
  id?: number
  page: number
  size: number
  filter?: string
}

export type User = {
  id: number
  nome: string
  urlFoto: string
  usuarioTipo: Role
};

export type Role = (typeof ROLES)[number]
