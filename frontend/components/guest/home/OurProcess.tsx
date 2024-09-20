import Image from 'next/image'
import React from 'react'

const OurProcess = () => {
    return (
        <main className="w-full flex md:flex-row flex-col justify-between gap-6 bg-darkgreen lg:px-12 md:px-6 px-4 md:mt-20 mt-12 lg:mb-20 py-12 relative">
            <div className='flex flex-col gap-10 lg:w-[30%]'>
                <h1 className="md:text-4xl text-3xl text-lightgreen font-semibold">Our Process</h1>
                <ul className='flex flex-col gap-7 list-none'>
                    <li className='flex gap-4 items-start'>
                        <h5 className='px-4 py-3 flex items-center justify-center bg-lightgreen text-darkgreen font-bold mt-1'>1</h5>
                        <p className='text-base text-gray-200'>Connect wallet: Start by connecting your digital wallet to AgroVest. This step ensures secure transactions and seamless interaction with the platform, allowing you to manage investments and access features easily.</p>
                    </li>
                    <li className='flex gap-4 items-start'>
                        <h5 className='px-4 py-3 flex items-center justify-center bg-lightgreen text-darkgreen font-bold mt-1'>2</h5>
                        <p className='text-base text-gray-200'>Create a business profile: Register and tokenize your agricultural business on AgroVest. Upload your business details, complete the verification process, and create digital tokens representing ownership stakes. </p>
                    </li>
                </ul>
            </div>

            <div className='flex flex-col justify-center gap-10 lg:w-[30%]'>
                <ul className='flex flex-col gap-7 list-none'>
                    <li className='flex gap-4 items-start'>
                        <h5 className='px-4 py-3 flex items-center justify-center bg-lightgreen text-darkgreen font-bold mt-1'>3</h5>
                        <p className='text-base text-gray-200'>Engage with Investors:  Investors can explore tokenized agricultural assets, review business profiles, and make investments directly in the businesses that interest them.</p>
                    </li>
                    <li className='flex gap-4 items-start'>
                        <h5 className='px-4 py-3 flex items-center justify-center bg-lightgreen text-darkgreen font-bold mt-1'>4</h5>
                        <p className='text-base text-gray-200'>Showcase your product: List your agricultural products on our dynamic marketplace. Create detailed product profiles with images, descriptions, and pricing to attract potential buyers.  </p>
                    </li>
                </ul>
            </div>

            {/* mockup */}
            <div className='absolute -top-16 left-1/2 lg:w-[313px] w-[143px] -translate-x-1/2 lg:block hidden'>
                <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725004222/elliizudku0gxtdcbtrz.png`} className='w-full' alt='heroBg' width={413} height={818} quality={100} priority />
            </div>
        </main>
    )
}

export default OurProcess