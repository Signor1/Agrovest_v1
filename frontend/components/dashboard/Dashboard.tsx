
import React from 'react'
import dynamic from "next/dynamic";
const Barchart = dynamic(() => import('./charts/BarChart'), { ssr: false });
const Piechart = dynamic(() => import('./charts/PieChart'), { ssr: false });

const UserDashboard = () => {
    return (
        <section className="w-full flex flex-col gap-6 py-4">
            <h1 className='uppercase text-darkgreen font-medium text-base md:text-xl'>Overview</h1>

            <main className="w-full grid lg:grid-cols-5 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-[5px] p-3 shadow-lg flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Businesses</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">10</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 shadow-lg flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Investors</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">98</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 shadow-lg flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Investments</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">10 ETH</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 shadow-lg flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Products</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">194</h1>
                </div>
                <div className="bg-gray-100 rounded-[5px] p-3 shadow-lg flex flex-col items-center justify-center gap-2">
                    <h4 className='text-gray-800 font-light'>Total Sales</h4>
                    <h1 className="text-2xl text-darkgreen font-semibold">0.9 ETH</h1>
                </div>
            </main>

            <main className='w-full grid lg:grid-cols-5 md:grid-cols-2 gap-4 my-7'>
                <div className="lg:col-span-3 flex flex-col bg-gray-100 rounded-[5px] p-4">
                    <h1 className='uppercase text-gray-800 text-lg font-medium  text-center'>Monthly Reports</h1>
                    <Barchart />
                </div>
                <div className="lg:col-span-2 flex flex-col bg-gray-100 rounded-[5px] p-4">
                    <h1 className='uppercase text-gray-800 text-lg font-medium  text-center'>Sales Reports</h1>
                    <Piechart />
                </div>
            </main>
        </section>
    )
}

export default UserDashboard