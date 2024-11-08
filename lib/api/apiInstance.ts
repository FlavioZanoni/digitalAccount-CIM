import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { TOKEN_COOKIE_NAME, USER_COOKIE_NAME, API_URL } from "../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiInstance.interceptors.request.use(
  async function(config) {
    let token;
    if (Platform.OS === 'web') {
      token = await AsyncStorage.getItem(TOKEN_COOKIE_NAME)
    } else {
      token = await SecureStore.getItemAsync(TOKEN_COOKIE_NAME)
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

