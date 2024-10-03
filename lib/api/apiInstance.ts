import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { TOKEN_COOKIE_NAME, USER_COOKIE_NAME, API_URL } from "../../constants"

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiInstance.interceptors.request.use(
  async function(config) {
    const token = await SecureStore.getItemAsync(TOKEN_COOKIE_NAME)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await SecureStore.deleteItemAsync(TOKEN_COOKIE_NAME)
      await SecureStore.deleteItemAsync(USER_COOKIE_NAME)

      window.location.href = `/login`
      return
    }
    if (error.response.status === 403) {
      window.location.href = `/403`
      return
    } else {
      return Promise.reject(error)
    }
  }
)
