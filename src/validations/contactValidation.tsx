import * as Yup from "yup"


export const contactSchema = Yup.object({
    fullname:Yup.string().
        required("نام و نام‌خانوادگی الزامی است"),
    email:Yup.string().email().
    required("ایمیل الزامی است"),
    job : Yup.string().nullable(),
    photo:Yup.string().url().nullable(),
    group:Yup.string().required("گروه الزامی است"),
    mobile:Yup.number().required("شماره موبایل الزامی است")

})