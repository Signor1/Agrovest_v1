import React from 'react'
import CartList from './CartList'

const MyCarts = () => {
    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-semibold text-base md:text-xl'>Your Carts</h1>

            <CartList />
        </section>
    )
}

export default MyCarts