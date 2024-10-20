"use client"
import React from "react"
import type { NextPage } from "next"
import Products from "@/components/dashboard/portfolioSubRoutes/Products"
import useGetFarmProductByAddress from "@/hooks/ReadHooks/useGetFarmProductByAddress";
import { useAccount } from "wagmi";

const PortfolioProducts: NextPage = () => {
    const {address} = useAccount();

    const {data: products} = useGetFarmProductByAddress(address);

    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <Products data={products}/>
        </main>
    )
}

export default PortfolioProducts