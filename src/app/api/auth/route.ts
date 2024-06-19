import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import argon2 from "argon2"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    (username === "admin" && password !== "MyClipboardApp") ||
    (username !== "admin" && password !== username + " " + "guest")
  )
    return NextResponse.json({}, { status: 400 })

  const expiresIn = 60 * 60 * 24 * 5 * 1000

  const usernameCookie = {
    name: "username",
    value: username,
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  }

  const sessionCookie = {
    name: "session",
    value: await argon2.hash(username),
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  }

  cookies().set(usernameCookie)
  cookies().set(sessionCookie)

  return NextResponse.json({}, { status: 200 })
}
