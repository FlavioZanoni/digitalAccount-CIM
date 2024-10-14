import { BaseEntity } from "../types"

export interface Appointment extends BaseEntity {
  data: string,
  tipo: string,
  status: string,
  observacao: string,
}

export interface MutateAppointment {

}
