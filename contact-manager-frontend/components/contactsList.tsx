import { Card, CardContent, CardTitle } from "./ui/card";

export async function ContactsList(token: string) {

    const response = await fetch( 'http://localhost:4000/contacts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        next: {
            tags: ['get-contacts-list']
        }
    })

    const data = await response.json()
    console.log(data)
    return (
        <>
            <h1>Contacts List</h1>
            <ul>
                {data.map((contact: any) => (
                    <li key={contact.id}>
                        <Card className="max-w-sm">
                            <CardContent>
                                <CardTitle>{contact.name}</CardTitle>
                                <p>{contact.address}</p>
                                <p>{contact.phone}</p>
                                <p>{contact.email}</p>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </>
    );
}

