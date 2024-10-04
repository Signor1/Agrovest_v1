import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const UserPortfolio = () => {
    const path = usePathname()
    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-semibold text-base md:text-xl'>Portfolio</h1>

            <main className="w-full bg-gray-100 grid lg:grid-cols-5 md:grid-cols-3 gap-4">
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Product</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">$3,500</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Invested</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">$30,500</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Product Sold</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">15</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Product Purchased</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">5</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Funds Raised</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">$1,500</h1>
                </div>
            </main>

            <div className="w-full flex gap-4">
                <Link href="/user/portfolio" className={`text-base rounded font-medium py-2 px-4  ${path === '/user/portfolio' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Farm</Link>
                <Link href="/user/marketplace/mine" className={`text-base rounded font-medium py-2 px-4  ${path === '/user/marketplace/mine' ? 'bg-darkgreen text-lightgreen' : 'text-darkgreen'}`}>My Products</Link>
            </div>

        </section>
    )
}

export default UserPortfolio