import Image from 'next/image';
import React from 'react'

const Products = ({ title }: { title: string }) => {
    return (
        <section className='w-full flex flex-col px-2 mb-20'>
            <main className='w-full flex flex-col gap-6'>
                <h1 className="md:text-2xl text-xl text-darkgreen font-medium">{title}</h1>

                <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
                    {
                        farmProducts.map((product, index) => (
                            <div key={index} className='bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col gap-2'>
                                <div className='w-full h-[150px]'>
                                    <Image src={product.image} alt='farm produce' width={300} height={217} quality={100} priority className='w-full h-full object-cover' />
                                </div>
                                <div className="flex w-full justify-between items-center">
                                    <h4 className='text-base font-semibold text-gray-700'>{product.name}</h4>
                                    <p className='text-gray-700'>{product.priceInEth} <span className="font-semibold">ETH</span></p>
                                </div>
                                <p className='text-sm text-gray-500'>{product.description}</p>
                                <button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[10px] text-base">Add to cart</button>
                            </div>
                        ))
                    }

                </div>
            </main>
        </section>
    )
}

export default Products

const farmProducts = [
    {
        name: "Cassava",
        priceInEth: 0.02,
        image: "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/ezptdsphjxnsbt9yhivf.jpg",
        description: "A versatile root vegetable that is a staple food in many African countries. Used to make products like garri and fufu."
    },
    {
        name: "Coco Yam",
        priceInEth: 0.03,
        image: "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/o5vkkoec30vmkitttaw3.jpg",
        description: "A tuber crop that is widely consumed in Africa, especially in West Africa, often boiled, fried, or pounded into fufu."
    },
    {
        name: "Maize",
        priceInEth: 0.015,
        image: "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/thkmjd7yr5awsfjfcqw0.jpg",
        description: "A staple cereal grain that is used in various forms, including cornmeal, flour, and as a vegetable."
    },
    {
        name: "Plantain",
        priceInEth: 0.025,
        image: "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/qya5lp1njplhtuzaugbl.jpg",
        description: "A starchy banana variety that is commonly fried, boiled, or roasted in many African dishes."
    },
    {
        name: "Groundnuts",
        priceInEth: 0.01,
        image: "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/qur0mhjjoi6eja2plwwg.jpg",
        description: "Also known as peanuts, groundnuts are widely grown in Africa and used for making oil, snacks, and sauces."
    },
    {
        name: "Palm Oil",
        priceInEth: 0.04,
        image: "https://res.cloudinary.com/dad1drjht/image/upload/v1725010653/jx8pbz3o1yaoo8ulamrf.jpg",
        description: "A highly versatile oil extracted from the fruit of the oil palm, used in cooking and as an ingredient in various products."
    },
];
