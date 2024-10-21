/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import useGetAllPurchasedProduct from '@/hooks/ReadHooks/useGetAllPurchasedProduct'
import { useAccount } from 'wagmi'

const PurchasedItems = () => {
    const {address} = useAccount()
    const path = usePathname()
    const {data: purchasedItem} = useGetAllPurchasedProduct(address)

    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-semibold text-base md:text-xl'>Transactions</h1>

            <div className="w-full flex gap-0 md:ml-3">
                <Link href="/user/transactions" className={`text-base font-medium py-2 px-4  ${path === '/user/transactions' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Cart</Link>
                <Link href="/user/transactions/purchased" className={`text-base font-medium py-2 px-4  ${path === '/user/transactions/purchased' ? 'bg-darkgreen text-gray-200' : 'text-darkgreen bg-lightgreen'}`}>Purchased</Link>

            </div>


            <div className='w-full flex-1 bg-gray-100 p-4 rounded'>
                <Table>
                    <TableHeader>
                        <TableRow className='text-gray-800'>
                            <TableHead className="text-start">Product</TableHead>
                            <TableHead>Price(ETH)</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-center">Total(ETH)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            purchasedItem?.map((item:ProductType, index:number) => (
                                <TableRow key={index} className='text-gray-600'>
                                    <TableCell className="font-medium text-start">
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[50px] h-[50px]'>
                                                <Image src={`https://gateway.pinata.cloud/ipfs/${item.product_image}`}
                          alt={item.product_name} width={640} height={427} quality={100} priority className='w-full h-full object-cover' />
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <h3 className='text-gray-700 font-semibold text-sm'>{item.product_name}</h3>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='font-medium'>{item.priceInEth}</TableCell>
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell className="text-center font-semibold">{Number(item.product_price)}</TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow >
                            <TableHead className="text-start font-semibold">Total</TableHead>
                            <TableHead className="font-semibold">2 ETH</TableHead>
                            <TableHead className="font-semibold">6</TableHead>
                            <TableHead className="text-center font-semibold">12 ETH</TableHead>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>


        </section>
    )
}

export default PurchasedItems