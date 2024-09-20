"use client";

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
import { updateContactSchema } from "@/lib/zod";
import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import { handleUpdateContact } from "../app/actions/contactActions";
import { Input } from "@/components/ui/input";

export default function ContactEdit({ contact, token }: { contact: any; token: string }) {
    const [globalError, setGlobalError] = useState<string>("");

    const form = useForm<z.infer<typeof updateContactSchema>>({
        resolver: zodResolver(updateContactSchema),
        defaultValues: {
            id: contact.id || "",
            name: contact.name || "",
            address: contact.address || "",
            phone: contact.phone || "",
            email: contact.email || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof updateContactSchema>) => {
        try {
            const result = await handleUpdateContact(values, token);
            if (result?.message) {
                setGlobalError(result.message);
            }
        } catch (error) {
            console.log(
                "An unexpected error occurred. Please try again.",
                error
            );
        }
    };

    return (
        <>
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
                        text="Edit Contact"
                        pending={form.formState.isSubmitting}
                    />
                </form>
            </Form>
        </>
    );
}
