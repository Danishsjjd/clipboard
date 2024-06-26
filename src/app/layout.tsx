import type { Metadata } from "next"
import { Inter } from "next/font/google"

import isLogin from "./api/utils/isLogin"

import ReactQueryProvider from "@/components/ReactQueryProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

import AuthContextProvider from "@/context/useAuth"

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
  const { username } = await isLogin()

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            <AuthContextProvider initialValue={{ username }}>
              <main>{children}</main>
              <Toaster />
            </AuthContextProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
