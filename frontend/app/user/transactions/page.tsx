import React from "react"
import type { NextPage } from "next"
import MyCarts from "@/components/dashboard/MyCarts"

const Transactions: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <MyCarts />
        </main>
    )
}

export default Transactions