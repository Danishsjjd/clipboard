import type { OurFileRouter } from "@/app/api/uploadthing/core"

import { generateReactHelpers } from "@uploadthing/react"

export const { useUploadThing, getRouteConfig, uploadFiles } =
  generateReactHelpers<OurFileRouter>({
    url: "/api/clipboard/files",
  })
