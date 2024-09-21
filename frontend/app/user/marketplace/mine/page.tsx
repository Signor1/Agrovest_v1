import React from "react"
import type { NextPage } from "next"
import MyMarket from "@/components/dashboard/MyMarket"


const MyMarketPlace: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <MyMarket />
        </main>
    )
}

export default MyMarketPlace