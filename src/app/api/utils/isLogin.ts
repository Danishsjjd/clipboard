import { cookies } from "next/headers"
import argon2 from "argon2"

export default async function isLogin() {
  const username = cookies().get("username")?.value
  const session = cookies().get("session")?.value
  let login = false

  try {
    login = await argon2.verify(session ?? "", username ?? "")
  } catch (e) {
    login = false
  }

  return { username: username && login ? username : "" }
}
