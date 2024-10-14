import { BaseEntity } from "../types"

export interface Attendance extends BaseEntity {
  data: string
  tipo: string
  status: string
}

export interface MutateAttendance {

}
