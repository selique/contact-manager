import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                let user = null;

                // validate credentials
                const parsedCredentials = signInSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    console.error("Invalid credentials:", parsedCredentials.error.errors);
                    return null;
                }

                // get user from contact-manager-backend
                const response = await fetch(process.env.BACKEND_URL + '/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(parsedCredentials.data)
                });

                if (response.status !== 201) {
                    console.log("Invalid credentials");
                    return null;
                } 

                user = await response.json();

                return user;
            }
        })
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            // const isAdmin = auth?.user?.user?.isAdmin;
            if (pathname.startsWith('/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            // if (pathname.startsWith("/dashboard") && isAdmin) {
            //     return Response.redirect(new URL('/', nextUrl));
            // }
            return !!auth;
        },
        jwt({ token, user }) {
            return { ...token, ...user };
        },
        session({ session, token }) {
            //@ts-ignore
            session.user = token;
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin"
    }
})