import {Link} from "react-router-dom"

export default function NotFound404(){
    return(
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-purple-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                    صفحه یافت نشد!
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    لطفا در وارد کردن آدرس دقت کنید. متاسفیم صفحه موردنظر شما پیدا نشد!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/" >
                    <p  className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"> بازگشت به صفحه اصلی</p>
                </Link>
                </div>
            </div>
        </main>
    )
}