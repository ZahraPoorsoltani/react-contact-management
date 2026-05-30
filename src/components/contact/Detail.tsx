import {useParams,Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'

import { ContactContext } from '../../context/contactContext'
import {getContact} from "../../services/contactService"
import Spinner from '../Spinner'
import Contact_def from "../../assets/imgs/Contact_def.jpg"

export default function Detail(){
    const {loading,setLoading,groups} = useContext(ContactContext)
    
    setLoading(false)
    const [contactState,setcontactState] = useState({
       id:"",fullname:"",email:"",mobile:"",job:"", group:"",photo:"" })
    const [err, setErr] = useState(false)
    const { contactId } = useParams<{ contactId: string }>()

    
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                
                if(contactId){
                    const {data:selectedContact} = await getContact(contactId)                
                    setLoading(false)                               
                    setcontactState(selectedContact)
                }
               

            }
            catch(err){
                setLoading(false)  
                setErr(true)
            }
            
        }
        fetchData()
    },[])
    if(loading){
        return <Spinner></Spinner>
    }
    if (!err && contactState)
        return(
            <div className='flex-col justify-items-center p-2 w-full border border-gray-400 bg-white rounded-lg '>
                <div className="flex  w-full">
                <img src={contactState.photo|| Contact_def}  className="w-28 h-28 object-cover" />
                
                <div className="w-full flex flex-row  rounded-b lg:rounded-l  p-1 flex flex-col justify-center content-center leading-normal">
                <div className="w-full text-sm text-gray-600 content-center  lg:border-gray-400  p-1">
                    <p className="border-b border-t border-l border-r  rounded p-2 border-gray-400">نام و نام خانوادگی:
                    {contactState.fullname} 
                    </p>
                    <p className="border-b  border-l border-r  rounded  p-2 border-gray-400">شماره تماس:
                    {contactState.mobile}
                    </p>
                    <p className="border-b  border-l border-r  rounded  p-2 border-gray-400">ایمیل: 
                    {contactState.email}
                    </p>
                    <p className="border-b  border-l border-r  rounded  p-2 border-gray-400"> شغل:
                    {contactState.job}
                    </p>
                
                    <p className="border-b  border-l border-r  rounded  p-2 border-gray-400"> گروه:
                    {groups.find((item)=>(item.id== contactState.group))?.name}
                    </p>
                </div>
                
                </div>
             </div>
             <Link to="/contacts" className='btn p-2 bg-purple-600 text-white cursor-pointer rounded w-80 hover:bg-purple-500'>بازگشت به صفحه اصلی</Link>

            </div>
            
        ) 
    return(
        <p>مخاطبی با این آیدی یافت نشد..</p>
    )
}