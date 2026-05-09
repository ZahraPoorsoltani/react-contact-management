import {createContext } from "react";
import type {Dispatch,SetStateAction} from "react"
import type { IContact, IGroup } from "../types/IContact";
import type { Updater } from "use-immer";


type ContactContextType = {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    contacts: any[];
    setContacts: Updater<IContact[]>;
    searchFilteredContact: IContact[];
    setsearchFilteredContact: Updater<IContact[]>;
    searchHandler,
    searchParam: string,
    groups:IGroup[],
    deleteContactHandler: (contactId: string, fullname: string)=>void
  };

export const ContactContext = createContext<ContactContextType>({
    loading:false,
    setLoading:()=>{},
    contacts:[],
    setContacts:()=>{},
    searchFilteredContact:[],
    setsearchFilteredContact:()=>{},
    searchHandler:(e)=>{},
    searchParam:"",
    groups:[],
    deleteContactHandler:(contactId:string,fullname:string)=>{}
    
})