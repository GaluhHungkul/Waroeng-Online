import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username?: string | null
      email?: string | null
      image?: string | null
      role?: string
      isMember?: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role?: string
    isMember?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username?: string | null
    email?: string | null
    role?: string
    isMember?: boolean
  }
}
