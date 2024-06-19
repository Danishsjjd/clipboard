"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
