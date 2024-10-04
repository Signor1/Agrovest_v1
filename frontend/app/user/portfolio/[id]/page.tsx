import FarmPortfolioD from "@/components/dashboard/details/FarmPortfolioD"
import React from "react"

const PortfolioDetails = ({ params }: { params: { id: string } }) => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <FarmPortfolioD id={params.id} />
        </main>
    )
}

export default PortfolioDetails