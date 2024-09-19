"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { contactSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import { handleAddContact } from "./actions/contactActions";
import { Input } from "@/components/ui/input";
import ContactsPage from "@/components/contactsList";

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [globalError, setGlobalError] = useState<string>("");
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            email: "",
            token: session?.user.access_token
        },
    });

    const onSubmit = async (values: z.infer<typeof contactSchema>) => {
        try {
            console.log(values);
            const result = await handleAddContact(values);
            if (result?.message) {
                setGlobalError(result.message);
            }  
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Card className="max-w-sm">
                <CardContent>
                    <CardTitle className="text-1xl font-bold">
                        Welcome, {session?.user.user.email}!
                    </CardTitle>
                </CardContent>
            </Card>
            {JSON.stringify(session, 'null', 2)}
            <ContactsPage token={session?.user.access_token} />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Add Contact
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="name"
                                                placeholder="Enter your name"
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
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="address"
                                                placeholder="Enter address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="phone"
                                                placeholder="Enter your phone"
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
    
                            {/* Submit button will go here */}
                            <LoadingButton
                                text="Add Contact"
                                pending={form.formState.isSubmitting}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}
