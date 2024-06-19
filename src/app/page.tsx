"use client"

import AuthPage from "@/components/Auth"
import { useAuth } from "@/context/useAuth"

const Home = () => {
  const { isLogin } = useAuth()
  return isLogin ? <div>Hello!</div> : <AuthPage />
}

export default Home
