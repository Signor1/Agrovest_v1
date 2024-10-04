import React from "react"
import type { NextPage } from "next"
import Investments from "@/components/dashboard/portfolioSubRoutes/Investments"

const PortfolioInvestments: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <Investments />
        </main>
    )
}

export default PortfolioInvestments