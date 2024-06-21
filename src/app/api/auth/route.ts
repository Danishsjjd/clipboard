import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    (username === "admin" && password !== process.env.ADMIN_PASSWORD) ||
    (username !== "admin" && password !== username + " " + "guest")
  )
    return NextResponse.json("Invalid credentials", { status: 400 })

  const expiresIn = 60 * 60 * 24 * 5 * 1000

  const usernameCookie = {
    name: "username",
    value: username,
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT!))
  const sessionCookie = {
    name: "session",
    value: await bcrypt.hash(username, salt),
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  }

  cookies().set(usernameCookie)
  cookies().set(sessionCookie)

  return NextResponse.json({ success: true }, { status: 200 })
}
