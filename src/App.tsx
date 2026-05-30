import {Route,Routes,Navigate,useNavigate,useSearchParams} from "react-router-dom"
import Contacts from './components/contact/contacts'
import  Detail from "./components/contact/Detail"
import Add from './components/contact/Add'
import NotFound404 from './components/contact/NotFound404'
import Layout from './components/Layout'
import { useState ,useEffect} from 'react'
import {getAllContacts,getAllGroups,addContact, deleteContact} from "./services/contactService"
import Edit from './components/contact/Edit'
import Swal from "sweetalert2";
import {ContactContext} from "./context/contactContext"
import { useImmer } from "use-immer";
import { ToastContainer, toast } from 'react-toastify';
import type { IContact } from './types/IContact'
import {debounce} from "lodash"

function App() {
  
  
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate()
  const [getContacts,setContacts] = useImmer<IContact[]>([])
  const [searchFilteredContact,setsearchFilteredContact] = useImmer<IContact[]>([])
  const [getGroups,setGroups] = useState([])
  const [searchParams,setSearchParams] = useSearchParams()
   


  async function  createContactSubmit(values:IContact){   
    try{
      
      setLoading((prev)=>(!prev))
      const {status}= await addContact(values)
      if (status===201){
        setContacts((draft)=>{draft.push(values)})
        setsearchFilteredContact((draft)=>{draft.push(values)})
        
        setLoading((prev)=>(!prev))
        navigate("/contacts")
        toast.success("مخاطب با موفقیت افزوده شد")
      }
      
    }
    catch(err){
      setLoading(false)
      console.log((err as Error).message)

      
    }   
  }
  
  
  useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const {data:contactData} = await getAllContacts()
            const {data:groupData} = await getAllGroups()
            setContacts(contactData)
            setGroups(groupData)
            const searchVal = searchParams.get("filter")
            if(searchVal){
              searchHandler(searchVal)
            }
            else  setsearchFilteredContact(contactData)

            setLoading(false)
        }
        catch(error){
            console.log((error as Error).message);
            setLoading(false)              

        }
    }
    fetchData();        
},[])



const deleteContactConfirm = (contactId: string, contactFullname: string) => {
  Swal.fire({
    title: "پاک کردن مخاطب",
    text: `مطمئنی که میخوای ${contactFullname} رو پاک کنی؟`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله، حذف شود",
    cancelButtonText: "انصراف",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteHandler(contactId);
    }
  });
};
async function deleteHandler(id:string){
  try{
      setLoading(true)
      
      const resp = await deleteContact(String(id))
      setLoading(false)

      if(resp){
        setContacts((draft)=>
           draft.filter((item)=>item.id != id))
        setsearchFilteredContact((draft)=>
           draft.filter((item)=>item.id != id))
        setLoading(false)
        toast.error("مخاطب باموفقیت پاک شد");

      }
  }
  catch(err){
      console.log((err as Error).message);
      setLoading(false)

      
  }
}

const searchHandler = async (value:string)=>{
  setSearchParams({filter:value})
  
  
  if (value)
  {
    const debounced =debounce((value: string) => {
      const filtered = getContacts.filter((item) =>
        item.fullname.toLowerCase().includes(value.toLowerCase())
      );   
    
      setsearchFilteredContact(filtered);
    }, 500);
    debounced(value)
  }
  else{
    setsearchFilteredContact(getContacts)
  }

   
  
}


  return (
  <ContactContext.Provider value={{
    contacts:getContacts,
    groups:getGroups,
    setContacts,
    loading,
    setLoading,
    searchFilteredContact,
    setsearchFilteredContact,
    searchHandler,
    searchParam:searchParams.get("filter")||"",
    deleteContactConfirm:deleteContactConfirm
  }}>
   <Layout />
   <ToastContainer   position="top-center"
      autoClose={5000}

      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
/>
   <div className='p-5 flex items-center justify-center'>
   <Routes>
        <Route path='/'  element={<Navigate to="/contacts" />} />
        <Route path='/contacts' element={<Contacts/>} />
        <Route path='/contacts/detail/:contactId' element={<Detail/>} />
        <Route path='/contacts/add' element={<Add 
                        createContactSubmit={createContactSubmit}
                        ></Add>} />
        <Route path='/contacts/edit/:contactId' element={<Edit></Edit>} />
        <Route path='*' element={<NotFound404/>}></Route>
    </Routes>
  </div>
   
  </ContactContext.Provider>
  )

}

export default App
