'use client'
import { farmProducts, ProductType } from '@/utils/products';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Products = ({ title }: { title: string }) => {
    const router = useRouter();
    return (
        <section className='w-full flex flex-col px-2 mb-20'>
            <main className='w-full flex flex-col gap-6'>
                <h1 className="md:text-2xl text-xl text-darkgreen font-medium">{title}</h1>

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
            </main>
        </section>
    )
}

export default Products
