import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '@/hooks/useUserContext';
import { usePathname } from 'expo-router';
import { router } from 'expo-router';

const Header = () => {
  const pathname = usePathname()

  const { userCtx } = useUserContext()
  const isHomeScreen = pathname === '/';

  if (pathname === '/menu') {
    return
  }

  return (
    <View style={{
      ...styles.container,
      justifyContent: isHomeScreen ? 'center' : 'flex-start'
    }}>
      {!isHomeScreen ? (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      ) : (
        <Text style={styles.welcomeText}>
          Olá, {userCtx?.nome || ""}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 32,
  },
  welcomeText: {
    fontSize: 20,
    color: '#1f1f1f',
  },
});

export { Header };

