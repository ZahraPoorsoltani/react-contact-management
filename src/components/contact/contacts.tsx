import { useContext } from "react"

import { ContactContext } from "../../context/contactContext"
import Contact from "./contact"
import Spinner from "../Spinner"


export default function Contacts(){   
    const {loading,searchFilteredContact} = useContext(ContactContext)
    if (loading){
        return <Spinner></Spinner>
    }
    
    return(
        <div className="grid grid-cols-3 gap-4">
            {searchFilteredContact.map((item)=>(
                        <Contact key={item.id}  user= {item}></Contact>
                    ))}
        </div>
        
        
    )
}