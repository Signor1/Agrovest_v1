/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import dynamic from "next/dynamic";
const Barchart = dynamic(() => import('./charts/BarChart'), { ssr: false });
const Piechart = dynamic(() => import('./charts/PieChart'), { ssr: false });
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useGetAllFarmProducts from '@/hooks/ReadHooks/useGetAllFarmProducts';
import useGetAllFarms from '@/hooks/ReadHooks/useGetAllFarms';
import useGetAllInvestors from '@/hooks/ReadHooks/useGetAllInvestors';
import { formatEther } from 'viem';
import useGetTotalSales from '@/hooks/ReadHooks/useGetTotalSales';
import useGetTotalInvestment from '@/hooks/ReadHooks/useGetTotalInvestment';
import useGetAllAvailableInvestment from '@/hooks/ReadHooks/useGetAllAvailableInvestment';

const UserDashboard = () => {
    const { data: products } = useGetAllFarmProducts();
    const { data: farms } = useGetAllFarms();
    const { data: investors } = useGetAllInvestors();
    const { data: totalSales } = useGetTotalSales();
    const { data: totalInvestment } = useGetTotalInvestment();
    const { data: availableInvestment } = useGetAllAvailableInvestment();

    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-medium text-base md:text-xl'>Overview</h1>

            <main className="w-full grid lg:grid-cols-5 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Businesses</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{farms?.length}</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Investors</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{investors?.length}</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Investments</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{totalInvestment ? formatEther(totalInvestment) : '0'} ETH</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Products</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{products?.length}</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Sales</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">{totalSales ? formatEther(totalSales) : '0'} ETH</h1>
                </div>
            </main>

            {/* <main className='w-full grid lg:grid-cols-5 md:grid-cols-2 gap-4 my-7'>
                <div className="lg:col-span-3 flex flex-col bg-gray-100 rounded-[5px] p-4">
                    <h1 className='uppercase text-gray-800 text-lg font-medium  text-center'>Monthly Reports</h1>
                    <Barchart />
                </div>
                <div className="lg:col-span-2 flex flex-col bg-gray-100 rounded-[5px] p-4">
                    <h1 className='uppercase text-gray-800 text-lg font-medium  text-center'>Sales Reports</h1>
                    <Piechart />
                </div>
            </main> */}

            {/* table  */}
            <main className='w-full bg-gray-100 rounded-[5px] p-4 flex flex-col gap-4'>
                <h2 className='text-gray-700 text-lg font-medium uppercase text-center'>Recent Business</h2>
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
                            availableInvestment?.slice(0, 3).map((farm: any, index: number) => (
                                <TableRow key={index} className='text-gray-600'>
                                    <TableCell className="font-medium text-start">{farm.name}</TableCell>
                                    <TableCell>{farm.minAmount}</TableCell>
                                    <TableCell>{farm.farmInvestorCount}</TableCell>
                                    <TableCell>{farm.amountRaised}</TableCell>
                                    <TableCell>{farm.minAmount - farm.amountRaised}</TableCell>
                                    <TableCell className="text-center">{(farm.minAmount - farm.amountRaised) > 0 ? "Ongoing" : "Ended"}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </main>
        </section>
    )
}

export default UserDashboard

