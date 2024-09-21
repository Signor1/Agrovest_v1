import React from "react"
import type { NextPage } from "next";
import MyCarts from "@/components/dashboard/MyCarts";

const UserCarts: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <MyCarts />
        </main>
    )
}

export default UserCarts