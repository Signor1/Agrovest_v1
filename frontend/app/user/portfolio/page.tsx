import React from "react"
import type { NextPage } from "next"
import UserPortfolio from "@/components/dashboard/Portfolio"

const Portfolio: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <UserPortfolio />
        </main>
    )
}

export default Portfolio