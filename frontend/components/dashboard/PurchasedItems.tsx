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
import { formatEther } from 'viem'
import { ProductType } from '@/utils/types'

const PurchasedItems = () => {
    const {address} = useAccount()
    const path = usePathname()
    const {data: purchasedItem} = useGetAllPurchasedProduct(address) as { data: ProductType[] };

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
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell className="text-center font-semibold">{formatEther(BigInt(Number(item.product_price)))}</TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>


        </section>
    )
}

export default PurchasedItems