import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, ActivityIndicator, Text, Platform, ImageResizeMode } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import * as FileSystem from 'expo-file-system';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api/user';
import { useUserContext } from '@/hooks/useUserContext';
import { API_URL } from '@/constants';

const url = API_URL

type CachedType = {
  [key: string]: {
    cached: boolean,
    uri: string
  }
}

const ImageCarousel = () => {
  const [cachedImages, setCachedImages] = useState<CachedType>({});
  const windowWidth = Dimensions.get('window').width;
  const isWeb = Platform.OS === 'web';
  const { userCtx } = useUserContext()

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const userData = await getUser(userCtx?.id?.toString() || "1");
      return userData.lojas;
    },
  });

  const getCachedImage = async (imageUrl: string) => {
    try {
      // For web, just return the URL directly
      if (isWeb) {
        return { uri: imageUrl, cached: false };;
      }

      const filename = imageUrl
        ?.split('/')
        ?.pop()
        ?.replace(/[^a-zA-Z0-9.]/g, '');
      const filepath = `${FileSystem.cacheDirectory}${filename}`;

      const fileInfo = await FileSystem.getInfoAsync(filepath);
      console.log("fileInfo", fileInfo)

      if (fileInfo.exists) {
        return { uri: fileInfo.uri, cached: true };
      }

      const downloadResult = await FileSystem.downloadAsync(url + imageUrl, filepath);
      console.log('Image cached:', downloadResult.uri);
      return { uri: downloadResult.uri, cached: true };
    } catch (error) {
      console.error('Error caching image:', error);
      // Fallback to direct URL
      return { uri: imageUrl, cached: false };
    }
  };

  useEffect(() => {
    const cacheImages = async () => {
      if (!users) return;

      const cachedUris: CachedType = {};
      for (const loja of users) {
        if (loja.logo) {
          cachedUris[loja.logo] = await getCachedImage(loja.logo);
        }
      }
      setCachedImages(cachedUris);
    };

    cacheImages();
  }, [users]);

  // Custom image component for web
  const ImageComponent = ({ source, style, resizeMode }:
    {
      source: { uri: string }
      style: { [key: string]: any }
      resizeMode: ImageResizeMode
    }) => {
    if (isWeb) {
      return (
        <img
          src={source.uri}
          style={{
            ...style,
            objectFit: resizeMode === 'contain' ? 'contain' : 'cover',
          }}
          alt="carousel-item"
        />
      );
    }
    return <Image source={source} style={style} resizeMode={resizeMode} />;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !users) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading images</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: { logo: string } }) => {
    let imageSource = item.logo ? cachedImages[item.logo] : null;

    if (imageSource) {
      if (!imageSource.cached && !imageSource.uri.startsWith('http')) {
        imageSource.uri = url + imageSource.uri
      }
    }

    useEffect(() => {
      console.log(imageSource)
    }, [imageSource])

    return (
      <View style={styles.itemContainer}>
        {imageSource ? (
          <ImageComponent
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text>No image available</Text>
          </View>
        )}
      </View>
    );
  };

  // Web-specific carousel styles

  return (
    <View style={[styles.container, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }]}>
      <Carousel
        loop
        width={windowWidth}
        height={300}
        autoPlay={true}
        data={users.filter((user) => user.logo)}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 300,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '90%',
    height: '90%',
  },
});

export { ImageCarousel };
