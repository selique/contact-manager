import ContactEdit from "./contactEdit";
import ContactDelete from "./contactDelete";
import { Card, CardContent, CardTitle } from "./ui/card";
import DialogModal from "./ui/dialog";
import { auth } from "@/auth";
export async function ContactsList() {
    const session = await auth();

    const response = await fetch( 'http://localhost:4000/contacts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.access_token}`
        },
        next: {
            tags: ['get-contacts-list']
        }
    })

    const data = await response.json()

    return (
        <ul className="flex flex-col gap-3 my-4">
            {data.map((contact: any) => (
                <li key={contact.id} className="flex gap-4">
                    <Card className="max-w-sm">
                        <CardContent>
                            <CardTitle>{contact.name}</CardTitle>
                            <p>{contact.address}</p>
                            <p>{contact.phone}</p>
                            <p>{contact.email}</p>
                            <DialogModal triggerText="Edit Contact" title="Edit Contact" description="Edit a new contact">
                                <ContactEdit contact={contact} token={session?.user.access_token}/>
                            </DialogModal>
                            {session?.user.user.isAdmin ? <DialogModal triggerText="Delete Contact" title="Delete this contact?!" description="You sure are you want to delete this contact?">
                                <ContactDelete contact={contact} token={session?.user.access_token}/>
                            </DialogModal> : null}
                            
                        </CardContent>
                    </Card>
                </li>
            ))}
        </ul>
    );
}

