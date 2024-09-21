import React from 'react'
import Image from 'next/image'


const HeroSection = () => {
    return (
        <main className='w-full bg-darkgreen'>
            <div className='w-full h-full md:h-auto lg:pt-28 pt-32 lg:pb-16 md:pb-16 pb-8 lg:px-14 md:px-6 px-4 grid md:grid-cols-2 lg:gap-16 gap-10'>
                {/* text */}
                <div className='flex flex-col justify-center order-2 md:order-1 lg:gap-7 gap-5'>
                    <h1 className='lg:text-7xl text-5xl text-white font-medium'>Discover <span className='text-lightgreen'>Fresh<br /></span> Agricultural<br /><span className='text-lightgreen'>Products</span>.
                    </h1>
                    <p className='text-gray-200 lg:text-2xl text-xl font-light'>Explore a diverse marketplace where farmers showcase their finest produce and businesses invite you to invest in the future of agriculture. </p>
                    <button className='text-darkgreen bg-lightgreen py-2.5 rounded-[10px]'>Explore</button>
                </div>

                {/* Image */}
                <div className='order-1 md:order-2 flex flex-col justify-center items-center h-[350px] md:h-auto'>
                    <div className='relative w-full'>
                        <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724971626/mipvhzfujwhtoqsng93b.png`} className='w-full' alt='heroBg' width={2320} height={2320} quality={100} priority />


                        <div className='absolute -top-6 left-1/2 lg:h-[300px] h-[200px] lg:w-[223px] w-[143px] -translate-x-1/2'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006108/ulvab467ct9i5ssytcnk.png`} className='w-full h-full' alt='hero Image' width={924} height={1232} quality={100} priority />
                        </div>


                        <div className='absolute -bottom-6 left-1/2 lg:h-[300px] h-[200px] lg:w-[223px] w-[143px] -translate-x-1/2'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006103/pepnfghwmjw0n4crdaii.png`} className='w-full h-full' alt='hero Image' width={924} height={1232} quality={100} priority />
                        </div>


                        <div className='absolute top-1/2 md:-left-4 -left-2 lg:h-[300px] h-[200px] lg:w-[223px] w-[143px] -translate-y-1/2'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006101/bxbmouf93mxmz3h9banz.png`} className='w-full h-full' alt='hero Image' width={924} height={1232} quality={100} priority />
                        </div>


                        <div className='absolute top-1/2 md:-right-4 -right-2 lg:h-[300px] h-[200px] lg:w-[223px] w-[143px] -translate-y-1/2'>
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006112/l4jlj0kxuvduyr5htvwf.png`} className='w-full h-full' alt='hero Image' width={924} height={1232} quality={100} priority />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default HeroSection