import React from "react"
import type { NextPage } from "next";
import UserDashboard from "@/components/dashboard/Dashboard";

const Dashboard: NextPage = () => {
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <UserDashboard />
        </main>
    )
}

export default Dashboard