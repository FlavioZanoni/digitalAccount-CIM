import axios from "axios"
import type {
  GenericResponse,
  ILoginResponse,
  IRegisterUser,
  IUserLogin,
} from "./types"
import { API_URL } from "../../../constants"

const authInstance = axios.create({
  baseURL: API_URL,
})

authInstance.defaults.headers.common["Content-Type"] = "application/json"

// refresh token code (untested)
/* export const refreshAccessTokenFn = async () => {
  const response = await authInstance.get<ILoginResponse>("auth/refresh")
  return response.data
}

authInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.message as string
    if (errMessage.includes("not logged in") && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessTokenFn()
      return authInstance(originalRequest)
    }
    return Promise.reject(error)
  }
)
 */
export const signUpUser = async (user: IRegisterUser) => {
  const response = await authInstance.post<GenericResponse>("auth/register", user)
  return response.data
}

export const loginUser = async (user: IUserLogin) => {
  const response = await authInstance.post<ILoginResponse>("/login/auth", user)
  return response.data as ILoginResponse
}

export const logoutUser = async () => {
  const response = await authInstance.get<GenericResponse>("auth/logout")
  return response.data
}
