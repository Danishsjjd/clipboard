import { redis } from "@/lib/redis"
import { NextRequest, NextResponse } from "next/server"
import { UTApi } from "uploadthing/server"
import parseValue from "../../utils/parseValue"

const utapi = new UTApi()

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json("Unauthorized", { status: 401 })

  const files = (await redis.lrange("files", 0, -1)).map(
    (e) => parseValue(e).split("/").pop() ?? ""
  )

  await utapi.deleteFiles(files)
  await redis.flushall()

  return NextResponse.json({ ok: true })
}
