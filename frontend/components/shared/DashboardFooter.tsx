'use client'
import React, { useEffect, useState } from "react"


const DashboardFooter = () => {
    const [year, setYear] = useState('')

    useEffect(() => {
        const year = new Date().getFullYear()
        setYear(year.toString())
    }, [])

    return (
        <footer className="w-full flex justify-center items-center py-6 bg-lightgreen/[40%]">
            <p className="text-sm text-darkgreen">© {year} AgroVest. All rights reserved.</p>
        </footer>
    )
}

export default DashboardFooter