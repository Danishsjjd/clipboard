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
  username: string
  setUsername: Dispatch<SetStateAction<string>>
}>(null)

const AuthContextProvider = ({
  children,
  initialValue,
}: {
  children: ReactNode
  initialValue?: { username: string }
}) => {
  const [username, setUsername] = useState(initialValue?.username ?? "")

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
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
