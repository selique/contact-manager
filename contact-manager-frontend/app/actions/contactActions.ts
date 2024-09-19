"use server";

export async function getContacts(token: string) {
    const contacts = await fetch(process.env.BACKEND_URL + '/contacts',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    return contacts.json()
}

export async function handleAddContact({ name, address, phone, email, token }: {
    name: string,
    address: string,
    phone: string,
    email: string
    token: string
}) {

    console.log({ name, address, phone, email, token})
    
    const addContact = await fetch(process.env.BACKEND_URL + '/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, address, phone, email })
    })
    if(addContact.status !== 201) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    }

    return addContact
}

export async function  handleUpdateContact({ id, name, address, phone, email, token }: {
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string,
    token: string
}) {
    const updateContact =  await fetch(process.env.BACKEND_URL + '/contacts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, name, address, phone, email })   
    })

    if(updateContact.status !== 201) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    }

    return updateContact
}

export async function  handleDeleteContact({ id, token }: {
    id: number
    token: string
}) {
    const deleteContact = await fetch(process.env.BACKEND_URL + '/contacts', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    })

    if(deleteContact.status !== 201) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    }

    return deleteContact
}
