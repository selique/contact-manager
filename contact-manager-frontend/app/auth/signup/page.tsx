"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signUpSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import {
    handleCredentialsSignup
} from "@/app/actions/authActions";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [globalError, setGlobalError] = useState<string>("");
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            isAdmin: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        try {
            const result = await handleCredentialsSignup(values);
            if (result?.message) {
                setGlobalError(result.message);
            } else {
                router.push("/auth/signin");
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Sign Up
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {globalError && <ErrorMessage error={globalError} />}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isAdmin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Is Admin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="checkbox"
                                                checked={field.value} // Use checked for checkbox
                                                onChange={(e) => field.onChange(e.target.checked)} // Update value based on checkbox state
                                                // Do not spread field, handle other props manually
                                                name={field.name}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                disabled={field.disabled}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit button will go here */}
                            <LoadingButton
                                text="Sign Up"
                                pending={form.formState.isSubmitting}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
