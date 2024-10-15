"use client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../lib/api"
import React, { createContext, useContext, useEffect, useState } from "react"
import { USER_COOKIE_NAME } from "@/constants"
type UserProps = {
  userCtx?: User
  setUserCtx: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UserContext = createContext({} as UserProps)

type Props = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [userCtx, setUserCtx] = useState<User | undefined>()
  const getUserInCookie = async () => {
    return await AsyncStorage.getItem(USER_COOKIE_NAME)
  }

  useEffect(() => {
    getUserInCookie().then((userInCookie) => {
      if (userInCookie) {
        setUserCtx({
          ...(JSON.parse(userInCookie || "") as User)
        })
      }
    })
  }, [])

  const values = {
    userCtx,
    setUserCtx,
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return context
}
