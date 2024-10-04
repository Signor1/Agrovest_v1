import React from "react"
import type { NextPage } from "next"
import Products from "@/components/dashboard/portfolioSubRoutes/Products"

const PortfolioProducts: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <Products />
        </main>
    )
}

export default PortfolioProducts