import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const DialogModal = ({
    title,
    description,
    children,
    triggerText,
    onClose
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    triggerText: string;
    onClose?: () => void;
}) => (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            <button className="text-primary/90-700 shadow-md hover:bg-mauve-300 inline-flex h-9 items-center justify-center rounded-md bg-white px-4 font-medium shadow-lg focus:shadow-outline-black focus:outline-none">
                {triggerText}
            </button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 fixed inset-0" />
            <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
                <Dialog.Title className="text-gray-800 m-0 text-lg font-medium">
                    {title}
                </Dialog.Title>
                <Dialog.Description className="text-gray-600 mt-2 mb-4 text-base">
                    {description}
                </Dialog.Description>

                {/* Render passed children */}
                {children}

                <Dialog.Close asChild>
                    <button
                        className="text-primary/90-700 hover:bg-primary/90-200 focus:shadow-outline-primary/90 absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full focus:outline-none"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

export default DialogModal;
