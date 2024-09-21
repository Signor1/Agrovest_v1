import React from "react"
import type { NextPage } from "next";
import MarketPlace from "@/components/dashboard/UserMarketPlace";


const UserMarketPlace: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <MarketPlace />
        </main>
    )
}

export default UserMarketPlace