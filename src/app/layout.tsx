import { Toaster } from "@/components/ui/toaster"
import ReactQueryProvider from "@/context/ReactQueryProvider"
import AuthContextProvider from "@/context/useAuth"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cookies } from "next/headers"
import argon2 from "argon2"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clipboard",
  description: "Share text and files with your friends",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const username = cookies().get("username")?.value
  const session = cookies().get("session")?.value
  let login = false

  try {
    login = await argon2.verify(session ?? "", username ?? "")
  } catch (e) {
    login = false
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthContextProvider
            initialValue={{ username: username && login ? username : "" }}
          >
            <main>{children}</main>
            <Toaster />
          </AuthContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
