"use client"
import React, { useEffect, useState } from "react"
import type { NextPage } from "next"
import Products from "@/components/dashboard/portfolioSubRoutes/Products"
import useGetFarmProductByAddress from "@/hooks/ReadHooks/useGetFarmProductByAddress";
import { useAccount } from "wagmi";
import { ProductType } from "@/utils/types";

const PortfolioProducts: NextPage = () => {
    const {address} = useAccount();

    const {data: products} = useGetFarmProductByAddress(address);

    const [arrayOfProducts, setArrayOfProducts] = useState<ProductType[]>([])

    useEffect(() => {
        if (Array.isArray(products)) {
            setArrayOfProducts(products);
        }
    }, [products]); 


    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <Products data={arrayOfProducts}/>
        </main>
    )
}

export default PortfolioProducts