import {Link,useParams,useNavigate} from "react-router-dom"
import { useContext } from "react"
import {Formik,Form,ErrorMessage, Field} from 'formik'
import {contactSchema} from "../../validations/contactValidation"
import type { IContact } from "../../types/IContact"
import { useEffect, useState } from "react"
import { getContact ,updateContact} from "../../services/contactService"
import Spinner from "../Spinner"
import { ContactContext } from "../../context/contactContext"
import { ToastContainer, toast } from 'react-toastify';

export default function Edit(){
    const navigator = useNavigate()
    const urlParams = useParams()
    const {loading,setLoading,groups,setContacts,setsearchFilteredContact} = useContext(ContactContext)
    
    const [editContactState,setEditContactState] =useState<IContact | null>()
    
        
    useEffect(()=>{
        const fetchData=async ()=>{
            setLoading(true)
            const {data:contactEdit} =await getContact(urlParams.contactId)
            setLoading(prev=>(!prev))
            
            
            setEditContactState(contactEdit)
        }
        fetchData()


    },[])

   
    const editContactSubmit =async (values)=>{      
        setLoading(true)
        try{
            const resp = await updateContact(values,
                editContactState.id)
            
            if (resp.status==200){
                
                setContacts(draft => {
                    const contactIndex = draft.findIndex((c) => c.id === editContactState.id);
                    draft[contactIndex] = {...editContactState}
                })
                setsearchFilteredContact(draft => {
                    const contactIndex = draft.findIndex((c) => c.id === editContactState.id);
                    draft[contactIndex] = {...editContactState}
                })
                
                
                setLoading(false)
                toast.success("مخاطب با موفقیت ویرایش شد")
                navigator("/contacts")
            }

        }
        catch(err){
            console.log(err.message)
        }
        

    }


    if(loading){
        return <Spinner></Spinner>
    }
    return(

        <Formik initialValues={{
            fullname:editContactState?.fullname
            ,email:editContactState?.email,
            mobile:editContactState?.mobile,
            job:editContactState?.job,
            group:editContactState?.group,
            photo:editContactState?.photo}} 
            validationSchema={contactSchema}
            onSubmit={(values)=>{
            editContactSubmit(values)}} >
                {({ errors, touched }) => (
                <Form className="w-full max-w-lg">
                    <h1 className="text-purple-600 text-center">افزودن مخاطب</h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 p-3  mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                نام و نام خانوادگی
                            </label>
                            <Field  className={`appearance-none block w-full  text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight 
                             focus:outline-purple-600 focus:bg-white 
                             ${errors.fullname && touched.fullname ? "border-red-500 focus:border-red-500": "border-gray-400 focus:border-purple-600"}`}
                            type="text" 
                            name="fullname"
                            />
                            <ErrorMessage name="fullname" render=
                                    {msg=><span className="text-red-500">{msg}</span> } />
                        </div>
                        <div className="w-full md:w-1/2 p-3 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                ایمیل
                            </label>
                            <Field 
                            className={`appearance-none block w-full  text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-purple-600 focus:bg-white focus:border-gray-500
                            ${errors.email && touched.email ? "border-red-500 focus:border-red-500": "border-gray-400 focus:border-purple-600"}`}
                            type="email" 
                            name="email"
                            placeholder="you@eample.com" />
                            <ErrorMessage name="email" render=
                                    {msg=><span className="text-red-500">{msg}</span> }/>
                        </div>
                        <div className="w-full md:w-1/2 p-3 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                شماره تماس
                            </label>
                            <Field  className={`appearance-none block w-full  text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-purple-600 focus:bg-white focus:border-gray-500 
                            ${errors.mobile && touched.mobile ? "border-red-500 focus:border-red-500": "border-gray-400 focus:border-purple-600"}`}
                            type="number"
                            name="mobile"
                            placeholder="+9812334" />
                            <ErrorMessage name="mobile" render=
                                    {msg=><span className="text-red-500">{msg}</span> }/>
                        </div>
                        <div className="w-full md:w-1/2 p-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                شغل
                            </label>
                            <Field className={`appearance-none block w-full  text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-purple-600 focus:bg-white focus:border-gray-500
                            ${errors.job && touched.job ? "border-red-500 focus:border-red-500": "border-gray-400 focus:border-purple-600"}`}
                            type="text" 
                            placeholder="" 
                            name="job"/>
                            <ErrorMessage name="job" render=
                                    {msg=><span className="text-red-500">{msg}</span> }/>
                        </div>
                        <div className="w-full md:w-1/2 p-3 py-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            گروه
                        </label>
                        <div className="relative">
                            <Field  className={`block appearance-none w-full border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-purple-600 focus:bg-white focus:border-gray-500
                            ${errors.group && touched.group ? "border-red-500 focus:border-red-500": "border-gray-400 focus:border-purple-600"}`}
                            name="group" as="select">
                                <option defaultValue={""}>انتخاب کنید</option>
                                {groups.length>0 && groups.map((item)=>(
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                                
                            </Field>
                            <ErrorMessage name="group" render=
                                    {msg=><span className="text-red-500">{msg}</span> }/>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* <div className="col-span-full">
                    <label  className="block text-sm/6 font-medium text-gray-900">عکس </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" className="mx-auto size-12 text-gray-300">
                            <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"  />
                        </svg>
                        <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label  className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                            <span> بارگذاری فایل</span>
                            <input  type="file"  name="photo" className="sr-only" />
                            </label>
                            <p className="pl-1"> یا کشیدن و رها کردن</p>
                        </div>
                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF تا حداکثر سایز 5MB</p>
                        </div>
                    </div>
                    </div> */}
                    <div className="w-full md:w-1/2 mt-3 mb-6 md:mb-0">
                        <button type="submit" className="bg-purple-600 hover:bg-purple-500 cursor-pointer ml-1 rounded text-white font-bold py-2 px-4">ذخیره</button>
                        <Link to= "/" className="bg-red-600 hover:bg-red-500 cursor-pointer rounded ml-1 text-white font-bold py-2 px-4 inline-flex items-center justify-center">انصراف</Link>
                    </div>
                </Form>)}
            </Formik>

    )
}