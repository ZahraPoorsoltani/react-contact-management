import { v4 as uuidv4 } from "uuid";
import  type { IContact } from "../types/IContact";


export const contactData:IContact[] = [{
    id:uuidv4(),
    name:"زهرا",
    family:"پورسلطانی",
    email:"zahrapoorsoltani7@gmail.com",
    phoneNumber:"0937565087"

},
{
    id:uuidv4(),
    name:"مجتبی",
    family:"یوسفی",
    email:"zahrapoorsoltani7@gmail.com",
    phoneNumber:"0937565087"

},
{
    id:uuidv4(),
    name:"مریم",
    family:"غلامپور",
    email:"zahrapoorsoltani7@gmail.com",
    phoneNumber:"0937565087"

},
{
    id:uuidv4(),
    name:"نرگس",
    family:"نادی",
    email:"zahrapoorsoltani7@gmail.com",
    phoneNumber:"0937565087"

},
{
    id:uuidv4(),
    name:"زهرا",
    family:"پورسلطانی",
    email:"zahrapoorsoltani7@gmail.com",
    phoneNumber:"0937565087"

}]
export function deleteContact(id:string){
    return contactData.filter((item)=>{item.id!=id})
}
export default contactData