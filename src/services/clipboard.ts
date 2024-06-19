import axios from "axios"

type ClipboardProps = { text: string }
export const clipboardAPI = (data: ClipboardProps) =>
  axios.post<string>("/api/clipboard/text", data).then((data) => data.data)
