import { StorageService } from "@/lib/StorageService"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import { Href, router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons"
import { useUserContext } from "@/hooks/useUserContext";

const getMenus = () => {
  return [
    {
      name: "Início",
      icon: "home",
      path: "/(tabs)",
    },
  ]
}

export default function MenuScreen() {
  const menus = getMenus()
  const { userCtx } = useUserContext()

  const clearStorage = async () => {
    await StorageService.clear()
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Icon size={24} name="account-circle" style={styles.avatarIcon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{userCtx?.nome}</Text>
            <Text style={styles.changeInfoText}></Text>
          </View>
        </View>
      </View>
      <View style={styles.menuContainer}>
        {menus.map((menu, index) => {
          /* if (!menu.allowedRoles.includes(userCtx?.usuarioTipo || "USER")) {
            return null;
          } */
          return (
            <TouchableOpacity
              key={index}
              onPress={() => router.navigate(menu.path as Href)}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                <Icon size={24} name={menu.icon} style={styles.icon} />
                <Text style={styles.menuText}>{menu.name}</Text>
              </View>
              <Icon
                size={24}
                name="arrow-forward-ios"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          clearStorage();
          router.replace("/login")
        }}
      >
        <View style={styles.logoutContent}>
          <Icon name="logout" style={[styles.icon, { color: 'red' }]} size={24} />
          <Text style={styles.logoutText}>Sair</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuText: {
    fontSize: 18,
    color: '#1F2937',
  },
  icon: {
    color: '#1F2937',
  },
  arrowIcon: {
    color: '#1F2937',
  },
  logoutButton: {
    padding: 24,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerContainer: {
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 32,
  },
  headerContent: {
    flexDirection: 'row',
    gap: 16,
    color: '#1F2937', // primary-10
  },
  avatarContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#D1D5DB', // primary-30
  },
  avatarIcon: {
    color: 'white',
  },
  textContainer: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
  },
  changeInfoText: {
    fontSize: 12,
  }
});
