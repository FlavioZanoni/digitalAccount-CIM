import React, { useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api/user';
import { useUserContext } from '@/hooks/useUserContext';
import FileSystem from 'expo-file-system';
import { API_URL } from '@/constants';

const CACHE_FOLDER = FileSystem ? `${FileSystem.cacheDirectory}store-logos/` : null;
const cacheManager = {
  setupDirectory: async () => {
    if (!FileSystem || !CACHE_FOLDER) return;

    try {
      const dirInfo = await FileSystem.getInfoAsync(CACHE_FOLDER);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(CACHE_FOLDER, {
          intermediates: true
        });
      }
    } catch (error) {
      console.error('Error setting up cache directory:', error);
    }
  },

  getCachedPath: (logoUrl: string, storeId: string) => {
    if (!FileSystem) return logoUrl;
    const fileExtension = logoUrl.split('.').pop() || 'png';
    return `${CACHE_FOLDER}${storeId}.${fileExtension}`;
  },

  downloadLogo: async (logoUrl: string, storeId: string) => {
    const fullUrl = "https://89.117.32.188/" + logoUrl;
    if (!FileSystem) return fullUrl;

    const cachedPath = cacheManager.getCachedPath(storeId, fullUrl);

    try {
      const fileInfo = await FileSystem.getInfoAsync(cachedPath);

      if (!fileInfo.exists) {
        const downloadPath = `${cachedPath}_temp`;
        await FileSystem.downloadAsync(fullUrl, downloadPath);
        await FileSystem.moveAsync({
          from: downloadPath,
          to: cachedPath
        });
      }

      return cachedPath;
    } catch (error) {
      console.error(`Error caching logo for store ${storeId}:`, error);
      return logoUrl;
    }
  },

  cleanupCache: async () => {
    if (!FileSystem || !CACHE_FOLDER) return;

    try {
      const files = await FileSystem.readDirectoryAsync(CACHE_FOLDER);
      if (files.length > 50) {
        const filesToDelete = files.slice(0, files.length - 50);
        await Promise.all(
          filesToDelete.map(file =>
            FileSystem.deleteAsync(`${CACHE_FOLDER}${file}`, { idempotent: true })
          )
        );
      }
    } catch (error) {
      console.error('Error cleaning cache:', error);
    }
  }
};

const ImageCarrousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const { userCtx } = useUserContext();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      await cacheManager.setupDirectory();
      const userData = await getUser(userCtx?.id?.toString() || "1");

      const usersWithCachedLogos = await Promise.all(
        userData.lojas.map(async (store) => ({
          ...store,
          cachedLogoPath: await cacheManager.downloadLogo(store.logo, store.id.toString())
        }))
      );

      return usersWithCachedLogos;
    },
  });

  const renderPagination = () => {
    const dotPosition = Animated.divide(scrollX, 200); // Adjust for item width

    return (
      <View style={styles.pagination}>
        {users?.map((_, i) => {
          const opacity = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          return <Animated.View key={i} style={[styles.dot, { opacity }]} />;
        })}
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading images</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={users}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: item.cachedLogoPath }}
              style={styles.logo}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 240,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: 200, // Match the width used in pagination calculation
    height: 200,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
});

export default ImageCarrousel;
