import axios from "axios"
import type { IContact } from "../types/IContact";

const SERVER_URL = "http://localhost:9000"

export const getAllContacts =()=>{
    const url = `${SERVER_URL}/contacts`
    return axios.get(url);
}

export const getContact=(contactId:string)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url);
}


export const getAllGroups =()=>{
    const url = `${SERVER_URL}/groups`
    return axios.get(url);
}

export const getGroup=(groupId:string)=>{
    const url = `${SERVER_URL}/groups/${groupId}`
    return axios.get(url);
}


export const addContact=(contact:IContact)=>{
    const url = `${SERVER_URL}/contacts/`
    return axios.post(url,contact);
}

export const updateContact=(contact:IContact,contactId:string)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(url,contact);
}

export const deleteContact=(contactId:string)=>{
    // console.log(contactId)
    const url = `${SERVER_URL}/contacts/${contactId}`
    

    return axios.delete(url);
}