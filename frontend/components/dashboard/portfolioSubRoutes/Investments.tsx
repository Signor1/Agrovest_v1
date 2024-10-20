'use client'
import { farmData } from '@/utils/products'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import PortfolioAnalytics from './PortfolioAnalytics'

const Investments = () => {
    const path = usePathname()
    const router = useRouter();

    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-semibold text-base md:text-xl'>Portfolio</h1>

            <PortfolioAnalytics />

            <div className="w-full flex gap-0 md:ml-3">
                <Link href="/user/portfolio" className={`text-base font-medium py-2 px-4  ${path === '/user/portfolio' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Farm</Link>
                <Link href="/user/portfolio/investments" className={`text-base font-medium py-2 px-4  ${path === '/user/portfolio/investments' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Investments</Link>
                <Link href="/user/portfolio/products" className={`text-base font-medium py-2 px-4  ${path === '/user/portfolio/products' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Products</Link>
            </div>

            <div className='w-full grid md:grid-cols-2 gap-8'>
                {
                    farmData.slice(1, 2).map((res, index) => (
                        <div key={index} className='bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col items-end gap-2'>
                            <div className='w-full h-[200px]'>
                                <Image src={res.imageUrl} alt={res.altText} width={2480} height={1360} quality={100} priority className='w-full h-full object-cover' />
                            </div>
                            <div className="flex w-full justify-between items-center">
                                <h4 className='text-base font-semibold text-left text-gray-700'>{res.name}</h4>
                            </div>
                            <p className='text-sm text-gray-500'>{res.description}</p>
                            <div className='flex w-full justify-between items-center'>
                                <p className='text-xl font-semibold text-gray-700'>{res.amountRaised}</p>
                                {
                                    path === '/user/portfolio' ?
                                        <button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3" onClick={() => router.push(`/user/portfolio/${res.id}`)}>View more</button>
                                        : path === '/user/portfolio/investments' ?
                                            <button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3" onClick={() => router.push(`/user/portfolio/investments/${res.id}`)}>View more</button>
                                            : null
                                }

                            </div>
                        </div>
                    ))
                }

            </div>

        </section>
    )
}

export default Investments