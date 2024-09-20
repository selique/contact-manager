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
import { contactSchema } from "@/lib/zod";
import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import { handleAddContact } from "../app/actions/contactActions";
import { Input } from "@/components/ui/input";
import DialogModal from "@/components/ui/dialog";

export default function ContactAdd(token: any) {
    const [globalError, setGlobalError] = useState<string>("");
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            email: "",
        },
    });
    const [open, setOpen] = useState(false); // Manage dialog state

    const onSubmit = async (values: z.infer<typeof contactSchema>) => {
        try {
            const result = await handleAddContact(values, token.token);
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
        <DialogModal triggerText="Add Contact" title="Add Contact" description="Add a new contact"  onClose={() => setOpen(false)}>
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
        </DialogModal>
    );
}
