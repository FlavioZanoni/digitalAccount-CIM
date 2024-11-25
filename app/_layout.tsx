import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/hooks/useUserContext';
import { StorageService } from '@/lib/StorageService';
import { TOKEN_COOKIE_NAME, USER_COOKIE_NAME } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { apiInstance } from '@/lib/api/apiInstance';

export default function RootLayout() {
  const queryClient = new QueryClient()
  const navigation = useNavigation()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const checkExistingToken = async () => {
    const token = await StorageService.getItem(TOKEN_COOKIE_NAME)
    if (!token) {
      router.push("/login")
    }
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      useInterceptors()
    }
    checkExistingToken()
  }, [loaded])

  const useInterceptors = () => {
    apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          StorageService.clear()
          const currentRoute = navigation?.getState()?.routes?.[navigation?.getState?.()?.index || 0].name;
          if (currentRoute !== "login") {
            navigation.navigate("login")
          }
          return
        }
      }
    )
  }

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={{ flex: 1 }} >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView >
        </QueryClientProvider>
      </UserProvider>
    </ThemeProvider >
  );
}
