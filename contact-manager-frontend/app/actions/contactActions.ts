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

export async function  handleUpdateContact({ id, name, address, phone, email, token }: {
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string,
    token: string
}) {
    try {
        await fetch('http://localhost:4000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
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

        await fetch('http://localhost:4000/contacts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ id })
        })
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    } 
} 