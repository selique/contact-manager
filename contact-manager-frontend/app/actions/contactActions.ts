"use server";

export async function getContacts(token: string) {
    try {
        const contacts = await fetch(process.env.BACKEND_URL + '/contacts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return contacts.json()
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    }
}

export async function handleAddContact({ name, address, phone, email, token }: {
    name: string,
    address: string,
    phone: string,
    email: string
    token: string
}) {
    console.log({ name, address, phone, email, token})
    try {
        const addContact = await fetch(process.env.BACKEND_URL + '/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, address, phone, email })
        })
        return addContact
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    }
}

export async function  handleUpdateContact({ id, name, address, phone, email, token }: {
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string,
    token: string
}) {
    try {
        await fetch(process.env.BACKEND_URL + '/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id, name, address, phone, email })   
        })
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    } 
}

export async function  handleDeleteContact({ id, token }: {
    id: number
    token: string
}) {

    try {

        await fetch(process.env.BACKEND_URL + '/contacts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        })
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    } 
} 