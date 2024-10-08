import { BaseEntity } from "../types"

export interface Store extends BaseEntity {
  id: 0,
  nome: string,
  numero: 0,
  endereco: string,
  pix: string,
  logo: string,
  periodicidade: 0,
  diaSemana: number,
  status: string,
}

export interface MutateStore {

}
