export type SignUpUser = {
  username: string
  email: string
  password: string
}

export type User = {
  isAuth: boolean
  email: string
  username: string
  bio?: string
  image: string
  token: string
}

export type UserSubmit = {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  url?: string
  terms?: boolean
}

export type SignUpData = {
  email: string
  password: string
  username: string
}

export type UserData = {
  token: string | undefined
  username: string
  bio?: string
  image?: string
  email: string
}

export type SigningUp = (props: SignUpData) => Promise<{
  type: 'OK' | 'TAKEN'
  data: any
}>

export type UpdateUser = (
  data: { [key: string]: string | undefined },
  token: string,
) => Promise<{
  type: 'OK' | 'TAKEN'
  data: any
}>
