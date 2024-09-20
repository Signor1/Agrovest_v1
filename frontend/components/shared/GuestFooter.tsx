'use client'

import React, { useEffect, useState } from "react"
import Logo from "./Logo"
import logo from "@/public/logo-green.png"
import Link from "next/link"
import { navLinks } from "@/utils/navLinks"
import { IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io"
import { FaSquareFacebook } from "react-icons/fa6"

const GuestFooter = () => {
    const [year, setYear] = useState('')

    useEffect(() => {
        const year = new Date().getFullYear()
        setYear(year.toString())
    }, [])

    return (
        <section className="w-full flex flex-col gap-10 lg:px-20 md:px-8 px-4 pt-28 bg-lightgreen/[40%]">
            <footer className=" w-full  grid md:grid-cols-2 gap-8 md:gap-0">
                <div className="w-full flex flex-col gap-6 items-start">
                    <Logo href="/" classname="md:w-[170px] w-[120px]" image={logo} />
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-600 text-lg">Subscribe  to our newsletter for exclusive updates.</p>
                        <div className="flex ">
                            <input type="email" className="bg-transparent text-gray-600 text-base w-full py-3 px-3.5 border border-gray-600 rounded-s-[10px]" placeholder="Enter your email" />
                            <button className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-e-[10px] text-base shadow shadow-gray-600">Subscribe</button>
                        </div>
                    </div>
                </div>
                {/* quick links */}
                <ul className="flex flex-col md:items-end md:justify-end gap-6">
                    {
                        navLinks.map((link, index): JSX.Element => (
                            <li className="block relative list-none group" key={index}>
                                <Link
                                    className={`text-sm font-medium text-gray-600 block leading-none  `}
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                    <li className="block relative list-none group">
                        <Link
                            className={`text-sm font-medium text-gray-600 block leading-none  `}
                            href={"/"}
                        >
                            Get Started
                        </Link>
                    </li>
                </ul>
            </footer>
            <div className="w-full border-t border-gray-500 py-6 flex md:flex-row flex-col md:justify-between justify-center gap-4">
                <p className="text-gray-600 text-sm text-center">© {year} AgroVest. All rights reserved.</p>
                {/* links */}
                <div className="flex justify-center gap-4">
                    <Link href="/" className="text-gray-600 text-sm">Terms & Conditions</Link>
                    <Link href="/" className="text-gray-600 text-sm">Privacy Policy</Link>
                </div>
                {/* socials */}
                <div className="flex justify-center gap-4">
                    <Link href="/" className="text-gray-600 text-sm">
                        <IoLogoLinkedin />
                    </Link>
                    <Link href="/" className="text-gray-600 text-sm">
                        <IoLogoInstagram />
                    </Link>
                    <Link href="/" className="text-gray-600 text-sm">
                        <FaSquareFacebook />
                    </Link>
                    <Link href="/" className="text-gray-600 text-sm">
                        <IoLogoTwitter />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GuestFooter