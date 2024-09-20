import Image from 'next/image'
import React from 'react'

const Opportunities = () => {
    return (
        <section className='w-full flex flex-col md:px-28 px-6 mb-20 pt-20'>
            <main className='w-full flex flex-col gap-6'>
                <h1 className="md:text-4xl text-3xl text-darkgreen font-medium">Explore Investment Opportunities</h1>

                <div className='w-full grid md:grid-cols-2 gap-8'>
                    <div className='bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col items-end gap-2'>
                        <div className='w-full h-[200px]'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725027529/hv0dkqebklrenv7aeoye.png`} alt='farm produce' width={2480} height={1360} quality={100} priority className='w-full h-full object-cover' />
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <h4 className='text-base font-semibold text-left text-gray-700'>Ashers Fishery Farm</h4>
                        </div>
                        <p className='text-sm text-gray-500'>A premium fishery farm offering investment opportunities in aquaculture, allowing investors to participate in the growing fish farming industry.</p>
                        <button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3">View more</button>
                    </div>

                    <div className='bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col items-end gap-2'>
                        <div className='w-full h-[200px]'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725027532/wr1rkyiv3npb2gy0wjyl.png`} alt='farm produce' width={2480} height={1360} quality={100} priority className='w-full h-full object-cover' />
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <h4 className='text-base font-semibold text-left text-gray-700'>Butch Lane</h4>
                        </div>
                        <p className='text-sm text-gray-500'>A promising investment venture focused on livestock farming, providing a chance for investors to support and benefit from sustainable meat production.</p>
                        <button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3">View more</button>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Opportunities