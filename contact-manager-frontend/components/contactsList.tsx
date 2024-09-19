import { useEffect, useState } from "react";
import { getContacts } from "@/app/actions/contactActions";

export default function ContactsPage(token: string ) {
    const [contacts, setContacts] = useState([] as any[]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await getContacts(token);
                setContacts(response);
            } catch (error) {
                setError(error);
            }
        };
        fetchContacts();
    }, [token]);

    return (
        <div>
            <h1>Contacts List</h1>
            {error && <div className="text-red-500">{error.message}</div>}
            <ul>
                {Array.isArray(contacts) && contacts.map((contact) => (
                    <li key={contact.id}>{contact.name}</li>
                ))}
            </ul>
        </div>
    );
}

