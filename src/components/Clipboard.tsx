"use client"

import { useMutation } from "@tanstack/react-query"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { clipboardAPI } from "@/services/clipboard"

import { useUploadThing } from "@/app/api/utils/uploadthing"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Header from "./Header"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"
import { errorToast, toast } from "./ui/use-toast"

type TextForm = {
  text: string
}

const Clipboard = ({
  files: _files,
  text: _text,
  cronDate,
}: {
  files: string[]
  text: string[]
  cronDate: string | null
}) => {
  const [text, setText] = useState(() => _text)
  const [files, setFiles] = useState(() => _files)
  const [progress, setProgress] = useState(0)

  const clipboard = useMutation({ mutationFn: clipboardAPI })

  const textForm = useForm<TextForm>({ defaultValues: { text: "" } })
  const onTextSubmit = (data: TextForm) => {
    clipboard.mutate(data, {
      onSuccess(data) {
        setText((pre) => [data, ...pre])
        textForm.reset()
      },
      onError: errorToast,
    })
  }

  const { startUpload, isUploading } = useUploadThing("uploader", {
    onClientUploadComplete: (res) => {
      setFiles((pre) => [...res.map((e) => e.url), ...pre])
      toast({ title: "Upload Completed" })
    },
    onBeforeUploadBegin(files) {
      setProgress(0)
      return files
    },
    onUploadProgress(p) {
      setProgress(p)
    },
    onUploadError(error: Error) {
      toast({ title: `ERROR! ${error.message}` })
    },
  })

  return (
    <>
      <Header cronDate={cronDate} />
      <div className="mx-auto max-w-3xl p-3 sm:p-8">
        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="file">Files</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <Form {...textForm}>
              <form onSubmit={textForm.handleSubmit(onTextSubmit)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Share text</CardTitle>
                    <CardDescription>Click save when you&apos;re done.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <FormField
                        control={textForm.control}
                        name="text"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button disabled={clipboard.isPending}>Save</Button>
                  </CardFooter>
                  <CollapsibleComponent content={text} type="text" />
                </Card>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="file">
            <Card>
              <CardHeader>
                <CardTitle>Share files</CardTitle>
                <CardDescription>Click save when you&apos;re done.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {isUploading ? (
                  <Progress value={progress} />
                ) : (
                  <input
                    type="file"
                    onChange={async (e) => e.target.files && startUpload(Array.from(e.target.files))}
                    multiple
                  />
                )}
              </CardContent>
              <CollapsibleComponent content={files} type="files" />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function CollapsibleComponent({ content, type }: { content: string[]; type: "text" | "files" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2 px-6 pb-6">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          Previous stored {type} ({content.length}):
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0" type="button">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        {content.map((e, i) => (
          <button
            type="button"
            className="block w-full rounded-md border px-4 py-3 text-left font-mono text-sm"
            key={i}
            onClick={async () => {
              if (type === "files") return window.open(e, "_blank", "noopener,noreferrer")

              try {
                await navigator.clipboard.writeText(e)
                toast({ title: "copied!" })
              } catch (e) {
                toast({ title: "Cannot able to copy text" })
              }
            }}
          >
            {e}
          </button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default Clipboard
