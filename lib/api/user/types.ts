import { Store } from "../store"
import { BaseEntity } from "../types"

export interface User extends BaseEntity {
  cpf: string
  email: string
  telefone: string
  cim: string
  grau: string
  tipo: string
  hash: string
  urlFoto: string
  status: string
  dataNascimento: string
  dataIniciacao: string
  dataAlteracao: string
  dataCadastro: string
  lojas: Store[]
}

export interface MutateUser {

}
