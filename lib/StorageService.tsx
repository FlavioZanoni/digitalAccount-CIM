import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { TOKEN_COOKIE_NAME, USER_COOKIE_NAME } from '@/constants';

export class StorageService {
  static isWeb = Platform.OS === 'web';

  static async setItem(key: string, value: string) {
    try {
      if (this.isWeb) {
        // Use AsyncStorage for web
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      if (this.isWeb) {
        return await AsyncStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  static async removeItem(key: string) {
    try {
      if (this.isWeb) {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  static async clear() {
    try {
      if (this.isWeb) {
        await AsyncStorage.clear();
      } else {
        // SecureStore doesn't have a clear method, so we need to remove items individually
        const keys = [TOKEN_COOKIE_NAME, USER_COOKIE_NAME];
        await Promise.all(keys.map(key => SecureStore.deleteItemAsync(key)));
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}
