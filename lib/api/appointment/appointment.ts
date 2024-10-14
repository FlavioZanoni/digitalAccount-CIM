import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateAppointment, Appointment } from "./types"

export const getAppointment = async ({
  page,
  size,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Appointment>>({
    method: "get",
    url: `agendas?page=${page}&size=${size}${filter || ""}`,
  })
}

export const getAppointmentPaginationless = async (): Promise<
  Appointment
> => {
  return await makeApiRequest({
    method: "get",
    url: `agendas/list`,
  })
}

export const getAppointmentById = async (id: number) => {
  return makeApiRequest<Appointment>({
    method: "get",
    url: `agendas/${id}`,
  })
}

export const mutateAppointment = async ({
  id,
  data,
}: {
  id?: number
  data: MutateAppointment
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `agendas/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `agendas`,
    data: data,
  })
}
