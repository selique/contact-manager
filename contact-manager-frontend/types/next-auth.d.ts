// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string;
        email: string | null;
        isAdmin: boolean;
        access_token: string;
    }
    interface Session {
        user: {
            access_token: string;
            user: User;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string | null;
        isAdmin: boolean;
    }
}
