"use client"

import AuthPage from "@/components/Auth"
import { useAuth } from "@/context/useAuth"

const Home = () => {
  const { username } = useAuth()
  return username ? <div>Hello {username}!</div> : <AuthPage />
}

export default Home
