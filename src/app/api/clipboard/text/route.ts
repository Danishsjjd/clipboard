import { NextRequest, NextResponse } from "next/server"
import isLogin from "../../utils/isLogin"
import { redis } from "@/lib/redis"

export async function POST(req: NextRequest) {
  const { username } = await isLogin()
  const { text } = await req.json()
  if (!username || typeof text !== "string")
    return NextResponse.json("Bad Request", { status: 400 })

  try {
    await redis.lpush("text", `${username}:${text}`)
    return NextResponse.json(text, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json("Server error", { status: 500 })
  }
}
