import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

import  Contact_def from "../../assets/imgs/Contact_def.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash, faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import type {IContact} from "../../types/IContact"
interface IContactProps{
  user:IContact,
}
export default function Contact({user}:IContactProps) {
  const {deleteContactHandler} = useContext(ContactContext)
  return (
      <div className="flex border border-gray-400 bg-white rounded-lg overflow-hidden">
        <img src={user.photo|| Contact_def}  className="w-28 h-28 object-cover" />
        
        <div className="flex flex-row  bg-white rounded-b lg:rounded-l  p-1 flex flex-col justify-center content-center leading-normal">
          <div className="text-sm text-gray-600 content-center  lg:border-gray-400  p-1">
            <p className="border-b border-t border-l border-r  rounded p-2 border-gray-400">نام و نام خانوادگی:
              {user.fullname} 
            </p>
            <p className="border-b  border-l border-r  rounded  p-2 border-gray-400">شماره تماس:
              {user.mobile}
            </p>
            <p className="border-b  border-l border-r  rounded  p-2 border-gray-400">ایمیل: 
               {user.email}
            </p>
            <p className="border-b  border-l border-r  rounded  p-2 border-gray-400"> شغل:
              {user.job}
            </p>
           
            <p className="border-b  border-l border-r  rounded  p-2 border-gray-400"> گروه:
              {user.group}
            </p>
          </div>
          <div className="flex flex-col justify-center p-1 flex-1">
          <button 
                type="button" 
                onClick={(e) => {
                  e.preventDefault();
                  deleteContactHandler(user.id, user.fullname);
              }}
                className="bg-red-600 p-2 mb-2 rounded"
            >
                <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-white" />
            </button>
            <Link to={`/contacts/edit/${user.id}`}>
              <FontAwesomeIcon icon={faEdit} className="bg-yellow-600 p-2  rounded cursor-pointer"/>
            </Link>
            <Link to={`/contacts/detail/${user.id}`}>
              <FontAwesomeIcon icon={faEye} className="bg-cyan-600 p-2 mt-2  rounded cursor-pointer"/>
            </Link>

          </div>
        </div>
    </div>
  );
};

