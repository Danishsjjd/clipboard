import AuthPage from "@/components/Auth"
import Clipboard from "@/components/Clipboard"
import AuthContextProvider from "@/context/useAuth"
import isLogin from "./api/utils/isLogin"
import { redis } from "@/lib/redis"

const Home = async () => {
  const { username } = await isLogin()

  const filterData = (data: string[]): string[] =>
    username
      ? data
          .filter((e) =>
            username === "admin" ? true : e.startsWith(`${username}:`)
          )
          .map((e) =>
            e
              .split(":")
              .filter((e, i) => i !== 0)
              .join(":")
          )
      : []
  let files: string[] = []
  let text: string[] = []

  if (username) {
    files = filterData(await redis.lrange("files", 0, -1))
    text = filterData(await redis.lrange("text", 0, -1))
  }

  return (
    <AuthContextProvider initialValue={{ username }}>
      {username ? <Clipboard files={files} text={text} /> : <AuthPage />}
    </AuthContextProvider>
  )
}

export default Home
