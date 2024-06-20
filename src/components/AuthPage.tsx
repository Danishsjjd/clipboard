"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { errorToast } from "@/components/ui/use-toast"
import { loginAPI } from "@/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
})

const AuthPage = () => {
  const login = useMutation({ mutationFn: loginAPI })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    login.mutate(data, {
      onSuccess() {
        window.location.reload()
      },
      onError: errorToast,
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#6b46c1] to-[#b794f4]">
      <div className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your clipboard.
            </p>
          </div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={login.isPending}
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
    </div>
  )
}

export default AuthPage
