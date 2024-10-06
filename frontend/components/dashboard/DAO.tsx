import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { farmInvestments } from '@/utils/products';
import { Button } from '@nextui-org/react';

const DAO = () => {
    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-medium text-base md:text-xl'>Governance</h1>

            <main className="w-full grid lg:grid-cols-5 md:grid-cols-3 gap-4 bg-gray-100">
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Proposals</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">10</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Locked Funds</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">980</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Delegated Votes</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">5</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Votes</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">1</h1>
                </div>
                <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <Button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base">Get Involved</Button>
                </div>
            </main>

            {/* table  */}
            <main className='w-full bg-gray-100 rounded-[5px] p-4 flex flex-col gap-4'>
                <h2 className='text-gray-700 text-lg font-medium uppercase text-center'>Recent Proposals</h2>
                <Table>
                    <TableHeader>
                        <TableRow className='text-gray-800'>
                            <TableHead className="text-start">Investor Address</TableHead>
                            <TableHead>Fund&apos;s Target</TableHead>
                            <TableHead>Farm ID</TableHead>
                            <TableHead>Amount Deposited</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            farmInvestments.slice(0, 3).map((farm, index) => (
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
        </section>
    )
}

export default DAO