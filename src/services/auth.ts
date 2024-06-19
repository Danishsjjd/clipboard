import axios from "axios"

type LoginProps = { username: string; password: string }
export const loginAPI = (data: LoginProps) =>
  axios
    .post<Record<string, undefined>>("/api/auth", data)
    .then((data) => data.data)

export const logoutAPI = () => axios.post("/api/auth/logout")
