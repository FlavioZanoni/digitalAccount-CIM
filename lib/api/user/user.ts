import { makeApiRequest } from "../makeApiRequest"
import { User } from "./types"

export const getUser = async (id: string) => {
  return makeApiRequest<User>({
    method: "get",
    url: `usuarios/${id}`,
  })
}
