"use client"

import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

const AuthContext = createContext<null | {
  isLogin: boolean
  setIsLogin: Dispatch<SetStateAction<boolean>>
}>(null)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error(
      "The useAuth hook must be used inside the <AuthContextProvider> component's context."
    )

  return context
}

export default AuthContextProvider
