'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Categories from './Categories'
import Products from './Products'


const MarketPlace = () => {
    const path = usePathname()
    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-semibold text-base md:text-xl'>Market Place</h1>

            <div className="w-full flex gap-4">
                <Link href="/user/marketplace" className={`text-base rounded font-medium py-2 px-4  ${path === '/user/marketplace' ? 'bg-darkgreen text-lightgreen' : 'text-darkgreen'}`}>All Products</Link>
                <Link href="/user/marketplace/mine" className={`text-base rounded font-medium py-2 px-4  ${path === '/user/marketplace/mine' ? 'bg-darkgreen text-lightgreen' : 'text-darkgreen'}`}>My Products</Link>
            </div>


            <Categories />

            <Products title="All Products" />
        </section>
    )
}

export default MarketPlace