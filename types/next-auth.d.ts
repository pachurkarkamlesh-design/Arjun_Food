import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'STUDENT' | 'MESS_OWNER' | 'ADMIN'
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: 'STUDENT' | 'MESS_OWNER' | 'ADMIN'
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: 'STUDENT' | 'MESS_OWNER' | 'ADMIN'
  }
}
