"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    }
                default:
                    return {
                        message: 'Something went wrong.',
                    }
            }
        }
        throw error;
    }
}

export async function handleCredentialsSignup({ email, password, isAdmin }: {
    email: string,
    password: string,
    isAdmin?: boolean
}) {
    try {
        await fetch(process.env.BACKEND_URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, isAdmin })
        }) 
    } catch (error) {
        if (error) {
            console.log(error)
            return {
                message: 'Something went wrong.',
                error: error
            }
        }
        throw error;
    }
}

export async function handleSignOut() {
    await signOut();
}