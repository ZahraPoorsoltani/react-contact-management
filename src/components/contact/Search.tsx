import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

export default function Search(){

  const {searchHandler,searchParam} = useContext(ContactContext)
  
   
    return(
        <div className="relative w-full sm:w-64">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                />
              </svg>

              <input
                type="text"
                placeholder="جستجوی مخاطب..."
                className="w-full rounded-md border border-purple-500 px-10 py-2 text-sm text-white 
                          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600"
                
                value={searchParam}
                onChange={(event)=>searchHandler(event.target.value)}
                
                
              />
          </div>
    )
}