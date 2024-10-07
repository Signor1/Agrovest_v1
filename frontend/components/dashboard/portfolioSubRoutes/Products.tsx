'use client'
import { farmProducts, ProductType } from '@/utils/products'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Products = () => {
    const path = usePathname()
    const router = useRouter();

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

            <div className="w-full flex gap-0 md:ml-3">
                <Link href="/user/portfolio" className={`text-base font-medium py-2 px-4  ${path === '/user/portfolio' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Farm</Link>
                <Link href="/user/portfolio/investments" className={`text-base font-medium py-2 px-4  ${path === '/user/portfolio/investments' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Investments</Link>
                <Link href="/user/portfolio/products" className={`text-base font-medium py-2 px-4  ${path === '/user/portfolio/products' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Products</Link>
            </div>

            <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
                {
                    farmProducts.map((product: ProductType, index: number): JSX.Element => (
                        <div key={index} className='bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col gap-2'>
                            <div className='w-full h-[150px]'>
                                <Image src={product.image} alt='farm produce' width={300} height={217} quality={100} priority className='w-full h-full object-cover' />
                            </div>
                            <div className="flex w-full justify-between items-center">
                                <h4 className='text-base font-semibold text-gray-700'>{product.name}</h4>
                                <p className='text-gray-700'>{product.priceInEth} <span className="font-semibold">ETH</span></p>
                            </div>
                            <p className='text-sm text-gray-500'>{product.description}</p>
                            <button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[10px] text-base" onClick={() => router.push(`/user/marketplace/${product.id}`)}>Add to cart</button>
                        </div>
                    ))
                }

            </div>

        </section>
    )
}

export default Products