import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateAttendance, Attendance } from "./types"

export const getAttendance = async ({
  page,
  size,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Attendance>>({
    method: "get",
    url: `presencas?page=${page}&size=${size}${filter || ""}`,
  })
}

export const getAttendancePaginationless = async (): Promise<
  Attendance
> => {
  return await makeApiRequest({
    method: "get",
    url: `presencas/list`,
  })
}

export const getAttendanceById = async (id: number) => {
  return makeApiRequest<Attendance>({
    method: "get",
    url: `presencas/${id}`,
  })
}

export const mutateAttendance = async ({
  id,
  data,
}: {
  id?: number
  data: MutateAttendance
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `presencas/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `presencas`,
    data: data,
  })
}
