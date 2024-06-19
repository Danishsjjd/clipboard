import { cookies } from "next/headers"
import bcrypt from "bcrypt"

export default async function isLogin() {
  const username = cookies().get("username")?.value
  const session = cookies().get("session")?.value
  let login = false

  try {
    login = await bcrypt.compare(username ?? "", session ?? "")
  } catch (e) {
    login = false
  }

  return { username: username && login ? username : "" }
}
