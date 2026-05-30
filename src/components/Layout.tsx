import {Link,useLocation} from "react-router-dom"
import Search from "./contact/Search"


export default function Layout(){
    const location = useLocation()
  
    

    return (
        <>
        <div className="flex items-center justify-between p-4 bg-purple-500 rounded-lg shadow-sm">
          <div className='flex'>
            <h1 className="flex text-xl font-bold text-white ml-2 content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                />
              </svg>
  
              وب اپلیکیشن مدیریت 
              <span className='text-black'>&nbsp;مخاطبین</span>
            </h1>
  
            <Link to="/contacts/add"  className="bg-purple-400 hover:bg-purple-300 cursor-pointer text-white font-bold py-2 px-4 rounded inline-flex justify-between justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>افزودن مخاطب</span>
            </Link>
          </div>

          <div className="w-64">
            {location.pathname=="/contacts"?
            <Search ></Search>:""}
           
            
          </div>
  
        </div>
        {/* {location.pathname === "/" && <Contacts />} */}
        
        
      </>
    )
} 