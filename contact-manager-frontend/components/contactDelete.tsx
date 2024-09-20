"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { deleteContactSchema } from "@/lib/zod";
import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import { handleDeleteContact } from "../app/actions/contactActions";

export default function ContactDelete({ contact, token }: { contact: any; token: string }) {
    const [globalError, setGlobalError] = useState<string>("");

    const form = useForm<z.infer<typeof deleteContactSchema>>({
        resolver: zodResolver(deleteContactSchema),
        defaultValues: {
            id: contact.id || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof deleteContactSchema>) => {
        try {
            const result = await handleDeleteContact(values.id, token);
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
                    {/* Submit button will go here */}
                    <LoadingButton
                        text="Delete Contact"
                        pending={form.formState.isSubmitting}
                    />
                </form>
            </Form>
        </>
    );
}
