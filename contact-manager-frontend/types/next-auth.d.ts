// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string
        email: string
        isAdmin: boolean
        access_token: string
    }
    interface Session {
        user: {
            user: User
            access_token: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        email: string
        isAdmin: boolean
    }
}