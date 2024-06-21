import isLogin from "../utils/isLogin"

import { redis } from "@/lib/redis"
import { type FileRouter, createUploadthing } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  uploader: f({
    image: { maxFileSize: "2GB", maxFileCount: 99 },
    video: { maxFileSize: "2GB", maxFileCount: 99 },
    audio: { maxFileSize: "2GB", maxFileCount: 99 },
    pdf: { maxFileSize: "2GB", maxFileCount: 99 },
    text: { maxFileSize: "2GB", maxFileCount: 99 },
    blob: { maxFileSize: "2GB", maxFileCount: 99 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({}) => {
      // This code runs on your server before upload
      const user = await isLogin()

      // If you throw, the user will not be able to upload
      if (!user.username) throw new UploadThingError("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.username }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await redis.lpush("files", `${metadata.userId}:${file.url}`)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
