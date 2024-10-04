'use client'
import { farmData, FarmDataType } from '@/utils/products';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from '@nextui-org/react'
import Image from 'next/image';
import React, { FormEvent, useMemo, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdEmail } from "react-icons/md";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const ExploreD = ({ id }: { id: string }) => {

    const [currentData, setCurrentData] = useState<FarmDataType[]>([])

    useMemo(() => {
        const farmDetail = farmData.filter((farm) => farm.id === Number(id));
        setCurrentData(farmDetail)
    }, [id])

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [amount, setAmount] = useState<number>()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-semibold text-base md:text-xl'>Farm Detail</h1>

            <main className="w-full bg-gray-100 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Funding Target</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{currentData[0]?.fundsTarget}</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Funds Raised</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{currentData[0]?.amountRaised}</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Investors</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{currentData[0]?.investors}</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <Button onPress={onOpen} className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base">Invest</Button>
                </div>
            </main>


            <main className='w-full grid md:grid-cols-2 md:h-[400px] bg-gray-200'>
                <div className='w-full h-full'>
                    <Image src={currentData[0]?.imageUrl} alt={currentData[0]?.altText} width={2480} height={1360} quality={100} priority className='w-full h-full object-cover' />
                </div>
                <div className='w-full flex flex-col gap-4 pt-8 px-8 pb-4 md:pb-0'>
                    <h2 className="text-2xl text-gray-700 font-semibold">{currentData[0]?.name}</h2>
                    <p className='text-gray-600'>{currentData[0]?.description}</p>
                    <div className='w-full border-t border-gray-700 py-5 flex flex-col gap-4'>
                        <p className='text-gray-600 flex items-center gap-1.5'>
                            <FaLocationDot />
                            {currentData[0]?.address}
                        </p>
                        <p className='text-gray-600 flex items-center gap-1.5'>
                            <IoLogoWhatsapp />
                            {currentData[0]?.phoneNumber}
                        </p>
                        <p className='text-gray-600 flex items-center gap-1.5'>
                            <MdEmail />
                            {currentData[0]?.email}
                        </p>
                    </div>
                </div>
            </main>

            {/* table  */}
            <main className='w-full bg-gray-100 rounded-[5px] p-4 flex flex-col gap-4'>
                <h2 className='text-gray-700 text-lg font-medium uppercase text-start'>Farm Listings</h2>
                <Table>
                    <TableHeader>
                        <TableRow className='text-gray-800'>
                            <TableHead className="text-start">Farm Name</TableHead>
                            <TableHead>Fund&apos;s Target</TableHead>
                            <TableHead>Investors</TableHead>
                            <TableHead>Amount Raised</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            currentData[0]?.fundingDetails.map((farm, index) => (
                                <TableRow key={index} className='text-gray-600'>
                                    <TableCell className="font-medium text-start">{farm.farmName}</TableCell>
                                    <TableCell>{farm.fundsTarget}</TableCell>
                                    <TableCell>{farm.investors}</TableCell>
                                    <TableCell>{farm.amountRaised}</TableCell>
                                    <TableCell>{farm.balance}</TableCell>
                                    <TableCell className="text-center">{farm.status}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </main>

            {/* modal  */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent >
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-gray-800 capitalize">Invest</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 py-3">
                                <form className="w-full grid gap-4" onSubmit={handleSubmit}>

                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="amount"
                                            className="text-gray-700 font-medium ml-1"
                                        >
                                            Enter Amount
                                        </label>
                                        <input
                                            type="number"
                                            name="amount"
                                            id="amount"
                                            placeholder="Enter amount"
                                            className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                        />
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

export default ExploreD