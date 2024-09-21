import Image from 'next/image'
import React from 'react'

const Categories = () => {
    return (
        <section className='w-full flex flex-col  px-2 my-4'>
            <main className='w-full flex flex-col gap-6'>
                <h1 className="md:text-3xl text-2xl text-darkgreen font-medium">Explore our product categories</h1>
                <div className='w-full grid md:grid-cols-2 md:gap-8'>
                    <div className='w-full flex items-center bg-gray-100 rounded-[10px] p-6 shadow-lg'>
                        <div className='flex-1 flex flex-col gap-3'>
                            <h4 className='md:text-3xl text-2xl text-gray-700'>Fresh Farm Produce</h4>
                            <p className='text-sm text-gray-500'>Farm-fresh fruits, vegetables, and herbs at their peak.</p>
                        </div>
                        <div className='w-[45%]'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006978/wk70uqjvhlrtaee3r5lh.png`} alt='farm produce' width={300} height={217} quality={100} priority className='w-full' />
                        </div>
                    </div>

                    <div className='w-full flex items-center bg-gray-100 rounded-[10px] gap-10 p-6 shadow-lg'>
                        <div className='flex-1 flex flex-col gap-3'>
                            <h4 className='md:text-3xl text-2xl text-gray-700'>Seeds & Plants</h4>
                            <p className='text-sm text-gray-500'>High-quality seeds and young plants ready for your garden.</p>
                        </div>
                        <div className='w-[30%] h-[180px]'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006977/f8bfn8wcti2vactra0mo.png`} alt='farm produce' width={200} height={239} quality={100} priority className='w-full h-full' />
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Categories