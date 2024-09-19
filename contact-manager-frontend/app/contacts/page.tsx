"use client";
import { useSession } from "next-auth/react";

export default function Contacts() {
    const { data: session, update } = useSession();
    return (
        <>
            {JSON.stringify(session, null, 2)}
            <h1>Can be accessed by any user.</h1>
        </>
    );
}
