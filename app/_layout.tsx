import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/hooks/useUserContext';
import { StorageService } from '@/lib/StorageService';
import { TOKEN_COOKIE_NAME } from '@/constants';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const checkExistingToken = async () => {
    const token = await StorageService.getItem(TOKEN_COOKIE_NAME)
    if (!token && loaded) {
      router.push("/login")
    }
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
    checkExistingToken()
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
