import type { Role } from "../types"

export interface IToken {
  iat: number
  sub: string
  roles: {
    authority: string
  }
}

export interface IUser {
  id: number
  name: string
  role: Role
  email: string
}
export interface IUserLogin {
  login: string
  password: string
}

export type IRegisterUser = Omit<IUser, "id" | "role"> & {
  password: string
  isApplicator: boolean
}

export interface GenericResponse {
  status: string
  message: string
}

export interface ILoginResponse {
  status: string
  token: string
  expiration: number
}
