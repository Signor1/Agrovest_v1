'use client'
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const ProgressLoader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen z-[9999] bg-white flex justify-center items-center">
            <InfinitySpin
                width="200"
                color="#02390F"
            />
        </div>
    )
}

export default ProgressLoader