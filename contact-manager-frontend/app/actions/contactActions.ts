"use server";

import { revalidateTag } from "next/cache";

export async function handleAddContact({ name, address, phone, email, userId}: {
    name: string,
    address: string,
    phone: string,
    email: string,
    userId: number
},  token: string) {
    try {
        
        const addContact = await fetch('http://localhost:4000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ name, address, phone, email, userId})
        })

        revalidateTag('get-contacts-list')
        
        return addContact
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    }
}

export async function  handleUpdateContact({ id, name, address, phone, email }: {
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string,
}, token: string) {
    console.log(token)
    try {
        const UpdateContact = await fetch('http://localhost:4000/contacts/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, address, phone, email })   
        })
        revalidateTag('get-contacts-list')
        return UpdateContact
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    } 
}

export async function handleDeleteContact(id: number, token: string) {
    try {
        console.log(token)
        const DeleteContact  = await fetch('http://localhost:4000/contacts/' + id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })

        revalidateTag('get-contacts-list')
        console.log(DeleteContact)
        return DeleteContact
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    } 
} 