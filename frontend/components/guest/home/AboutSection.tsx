import Image from 'next/image'
import React from 'react'

const AboutSection = () => {
    return (
        <section className='w-full flex flex-col items-center lg:px-20 md:px-6 px-4 md:my-20 my-12'>
            <main className="w-full lg:h-[600px] grid lg:grid-cols-2 bg-lightgreen/[40%] lg:rounded-e-2xl">
                <div className='w-full h-full grid grid-rows-2'>
                    <div className='w-full h-full'>
                        <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724974943/goejgvi3hst0zlxn139l.png`} className='w-full h-full' alt='heroBg' width={761} height={336} quality={100} priority />
                    </div>
                    <div className='w-full h-full'>
                        <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724974937/kaaz3t9bxzuzincfshq2.png`} className='w-full h-full' alt='heroBg' width={761} height={336} quality={100} priority />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-6 px-6 md:py-12 py-8'>
                    <h1 className="lg:text-5xl md:text-4xl text-3xl text-darkgreen font-medium">About AgroVest</h1>
                    <p className='text-gray-900 text-lg'>Welcome to AgroVest, where innovation meets agriculture. We’re redefining how farmers connect with investors and customers through our cutting-edge platform. AgroVest empowers farmers to tokenize their businesses, opening up new avenues for investment and growth.</p>
                    <p className='text-gray-900 text-lg'>Our platform provides a secure, decentralized environment for farmers to showcase their products and attract investment from a global network of investors. By digitizing agricultural assets and offering them on a dynamic marketplace, we bridge the gap between farm operations and capital, fostering sustainable growth and increased profitability.</p>
                    <p className='text-gray-900 text-lg'>Join us in shaping the future of farming with transparency, efficiency, and innovation.</p>
                </div>
            </main>
        </section>
    )
}

export default AboutSection