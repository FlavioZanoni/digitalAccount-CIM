import type { Role, User } from "../types"

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
  username: string
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

export interface ILoginResponse extends User {
  token: string
}
