import React from "react"
import type { NextPage } from "next"
import PurchasedItems from "@/components/dashboard/PurchasedItems"

const Purchased: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <PurchasedItems />
        </main>
    )
}

export default Purchased