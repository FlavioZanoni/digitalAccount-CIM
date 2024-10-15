import { Tabs } from 'expo-router';
import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons"
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/Header';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarStyle: {
            height: 80,
          },
          tabBarIconStyle: {
            height: 24,
          },
          tabBarItemStyle: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          },
          tabBarLabelStyle: {
            marginLeft: 0
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color }) => (
              <Icon size={24} name={'home'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendário',
            tabBarIcon: ({ color }) => (
              <Icon size={24} name={'event'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="attendance"
          options={{
            title: 'Presenças',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon size={24} name={'fact-check'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu/index"
          options={{
            title: 'Menu',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon size={24} name={'menu'} color={color} />
            ),
          }}
        />
      </Tabs >
    </>
  );
}
