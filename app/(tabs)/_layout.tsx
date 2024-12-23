import { Tabs } from 'expo-router';
import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons"
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/Header';

export default function TabLayout() {
  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['light'].tint,
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
          tabBarIconStyle: {
            height: 24,
          },
          tabBarItemStyle: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            marginTop: 10
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
