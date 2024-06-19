import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  //Remove the value and expire the cookie
  const session = {
    name: "session",
    value: "",
    maxAge: -1,
  }

  const username = {
    name: "username",
    value: "",
    maxAge: -1,
  }

  cookies().set(session)
  cookies().set(username)
  return NextResponse.json({}, { status: 200 })
}
