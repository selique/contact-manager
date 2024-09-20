"use server";

import { revalidateTag } from "next/cache";
type ApiResponse = Response | { message: string };

export async function handleAddContact({ name, address, phone, email}: {
    name: string,
    address: string,
    phone: string,
    email: string,
},  token: string): Promise<ApiResponse> {
    try {
        const addContact = await fetch('http://localhost:4000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, address, phone, email})
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
}, token: string): Promise<ApiResponse> {
    try {
        const updateContact = await fetch('http://localhost:4000/contacts/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, address, phone, email })   
        })
        revalidateTag('get-contacts-list')
        return updateContact
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    } 
}

export async function handleDeleteContact(id: number, token: string): Promise<ApiResponse> {
    try {
        const deleteContact  = await fetch('http://localhost:4000/contacts/' + id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })

        revalidateTag('get-contacts-list')
        return deleteContact
    } catch (error) {
        return {
            message: 'Something went wrong. Please try again.'
        }
    } 
} 