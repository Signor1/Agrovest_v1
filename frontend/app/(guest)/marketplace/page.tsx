import Categories from "@/components/guest/marketplace/Categories";
import HeroSection from "@/components/guest/marketplace/HeroSection";
import OurProcess from "@/components/guest/marketplace/OurProcess";
import Products from "@/components/guest/marketplace/Products";
import type { NextPage } from "next";
import React from 'react'

const MarketPlace: NextPage = () => {

    return (
        <main className="w-full flex flex-col overflow-x-hidden bg-lightgreen/[40%]">
            <HeroSection />
            <Categories />
            <Products />
            <OurProcess />
        </main>
    );
};

export default MarketPlace;
