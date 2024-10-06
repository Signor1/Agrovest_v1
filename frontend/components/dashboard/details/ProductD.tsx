'use client'
import { farmProducts, ProductType } from '@/utils/products';
import Image from 'next/image';
import React, { FormEvent, useMemo, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from '@nextui-org/react'

const ProductD = ({ id }: { id: string }) => {

    const [currentData, setCurrentData] = useState<ProductType[]>([])

    useMemo(() => {
        const farmDetail = farmProducts.filter((farmProduct) => farmProduct.id === Number(id));
        setCurrentData(farmDetail)
    }, [id])

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [review, setReview] = useState<string>("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }
    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-semibold text-base md:text-xl'>Product Detail</h1>

            <main className='w-full grid md:grid-cols-2 md:h-[400px] bg-gray-200'>
                <div className='w-full h-full'>
                    <Image src={currentData[0]?.image} alt="productImage" width={640} height={427} quality={100} priority className='w-full h-full object-cover' />
                </div>
                <div className='w-full flex flex-col gap-4 pt-8 px-8 pb-4 md:pb-0'>
                    <h4 className='text-gray-600'>Obasanjo Farm</h4>
                    <div className="w-full flex justify-between items-center">
                        <h2 className="text-2xl text-gray-700 font-semibold">{currentData[0]?.name}</h2>
                        <p className='text-gray-600'>{currentData[0]?.priceInEth} <span className="font-semibold">ETH</span></p>
                    </div>
                    <p className='text-gray-600'>{currentData[0]?.description}</p>
                    <div className='w-full flex justify-between items-center'>
                        <p className='text-gray-600'>
                            Quantity
                        </p>
                        <div className='flex'>
                            <button className="bg-darkgreen text-gray-200 flex justify-center items-center w-10 h-10 rounded-[5px] text-base"></button>
                            <input type="number" className='w-10 h-10 border-[0.5px] border-gray-400 rounded text-center text-gray-700' />
                            <button className="bg-darkgreen text-gray-200 flex justify-center items-center w-10 h-10 rounded-[5px] text-base"></button>
                        </div>
                    </div>
                    <Button type="button" className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3">
                        Add to cart
                    </Button>
                </div>
            </main>

            {/* Reviews */}
            <main>
                <div>
                    <h2>Product Reviews</h2>
                    <Button onPress={onOpen} className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base">Submit Review</Button>
                </div>
            </main>

            {/* modal  */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent >
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-gray-800 capitalize">Review Product</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 py-3">
                                <form className="w-full grid gap-4" onSubmit={handleSubmit}>

                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="productName"
                                            className="text-gray-700 font-medium ml-1"
                                        >
                                            Review
                                        </label>
                                        <textarea

                                            name="review"
                                            id="review"
                                            placeholder="Write your review..."
                                            className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <Button type="submit" className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3">
                                        Submit
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}

export default ProductD