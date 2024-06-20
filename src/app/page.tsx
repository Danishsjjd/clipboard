import AuthPage from "@/components/Auth"
import Clipboard from "@/components/Clipboard"
import AuthContextProvider from "@/context/useAuth"
import isLogin from "./api/utils/isLogin"
import { redis } from "@/lib/redis"
import parseValue from "./api/utils/parseValue"

const Home = async () => {
  const { username } = await isLogin()

  const filterData = (data: string[]): string[] =>
    username
      ? data
          .filter((e) =>
            username === "admin" ? true : e.startsWith(`${username}:`)
          )
          .map(parseValue)
      : []
  let files: string[] = []
  let text: string[] = []
  let cronDate: string | null = null

  if (username) {
    files = filterData(await redis.lrange("files", 0, -1))
    text = filterData(await redis.lrange("text", 0, -1))

    if (username === "admin") cronDate = await redis.get("cron")
  }

  return (
    <AuthContextProvider initialValue={{ username }}>
      {username ? (
        <Clipboard cronDate={cronDate} files={files} text={text} />
      ) : (
        <AuthPage />
      )}
    </AuthContextProvider>
  )
}

export default Home
