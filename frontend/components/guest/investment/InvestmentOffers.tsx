import React from 'react'
import Image from 'next/image'

const InvestmentOffers = () => {
    return (
        <div className="bg-white w-full">
            <section className='w-full flex flex-col items-center lg:px-20 md:px-6 px-4 md:my-20 my-12'>
                <main className='w-full grid md:grid-cols-2 gap-6'>
                    {/* 1 */}
                    <div className='w-full md:col-span-2 grid md:grid-cols-2 lg:gap-12 gap-6 bg-lightgreen/[40%] md:rounded-t-3xl md:px-12 px-8 md:py-12 py-10'>
                        <div className='order-2 md:order-1 flex flex-col justify-center gap-4'>
                            <h1 className='md:text-4xl text-4xl text-darkgreen font-semibold'>Investment Offers</h1>
                            <h4 className='text-2xl text-gray-800 capitalize font-medium'>Diverse Portfolio</h4>
                            <p className='text-gray-800 font-light text-lg'>AgroVest offers a range of agricultural businesses to diversify your portfolio. Invest in various farms, agri-tech ventures, and sustainable projects, enhancing your portfolio&apos;s stability and growth potential.</p>
                        </div>
                        <div className="w-full order-1 md:order-2 h-[320px] rounded-xl overflow-hidden">
                            <Image src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725029661/cyzxyylz1eq9r80hzreq.png`} className='w-full h-full object-cover' alt='our offer image' width={497} height={396} quality={100} priority />
                        </div>
                    </div>

                    {/* 2 */}
                    <div className='flex flex-col gap-4 bg-darkgreen md:rounded-bl-3xl md:px-12 px-8 md:py-12 py-10'>
                        <div className='w-16 h-16 flex items-center justify-center bg-lightgreen text-darkgreen'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                            </svg>
                        </div>
                        <h1 className='md:text-2xl text-xl text-lightgreen font-medium capitalize'>Stable Returns</h1>
                        <p className='text-gray-200 font-light text-base'>AgroVest connects you to agricultural projects that offer reliable, long-term returns, even in volatile markets. Our platform focuses on stable investments that consistently deliver growth.</p>
                    </div>

                    {/* 3 */}
                    <div className='flex flex-col gap-4 bg-darkgreen md:rounded-br-3xl md:px-12 px-8 md:py-12 py-10'>
                        <div className='w-16 h-16 flex items-center justify-center bg-lightgreen text-darkgreen'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className='md:text-2xl text-xl text-lightgreen font-medium capitalize'>Sustainable Growth</h1>
                        <p className='text-gray-200 font-light text-base'>With AgroVest, your investments support eco-friendly farming practices. By backing sustainable agriculture, you&apos;re contributing to a healthier planet while securing future returns. </p>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default InvestmentOffers