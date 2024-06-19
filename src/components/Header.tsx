"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/useAuth"
import { logoutAPI } from "@/services/auth"
import { useMutation } from "@tanstack/react-query"
import { errorToast, toast } from "./ui/use-toast"

export default function Header() {
  const { username } = useAuth()
  const logout = useMutation({ mutationFn: logoutAPI })

  return (
    <header className="flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium capitalize">{username}</div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        disabled={logout.isPending}
        onClick={() =>
          logout.mutate(undefined, {
            onSuccess() {
              window.location.reload()
            },
            onError: errorToast,
          })
        }
      >
        <LogOutIcon />
        <span className="sr-only">Logout</span>
      </Button>
    </header>
  )
}

function LogOutIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
