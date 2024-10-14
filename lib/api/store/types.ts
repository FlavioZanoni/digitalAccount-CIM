import { BaseEntity } from "../types"

export interface Store extends BaseEntity {
  id: number,
  nome: string,
  numero: number,
  endereco: string,
  pix: string,
  logo: string,
  periodicidade: number,
  diaSemana: number,
  status: string,
}

export interface MutateStore {

}
