
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";

import { ContactsList } from "@/components/contactsList";
import ContactAdd from "@/components/contactAdd";

export default async function Home() {
    const session = await auth();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Card className="max-w-sm">
                <CardContent>
                    <CardTitle className="text-1xl font-bold">
                        Welcome, {session?.user.user.email}!
                    </CardTitle>
                </CardContent>
            </Card>
            
            <div className="flex gap-5">
                <div className="w-1/2">
                    <ContactsList token={session?.user.access_token} />
                </div>
                <div className="w-1/2">
                    <ContactAdd token={session?.user.access_token} userId={session?.user.user.id}/>
                </div>
            </div>
        </main>
    );
}
