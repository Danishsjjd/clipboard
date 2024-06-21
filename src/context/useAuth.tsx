"use client"

import { Dispatch, type ReactNode, SetStateAction, createContext, useContext } from "react"

const AuthContext = createContext<null | {
  username: string
}>(null)

const AuthContextProvider = ({
  children,
  initialValue,
}: {
  children: ReactNode
  initialValue: { username: string }
}) => {
  return <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("The useAuth hook must be used inside the <AuthContextProvider> component's context.")

  return context
}

export default AuthContextProvider
