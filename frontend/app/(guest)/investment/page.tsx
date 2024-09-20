import HeroSection from "@/components/guest/investment/HeroSection";
import InvestmentOffers from "@/components/guest/investment/InvestmentOffers";
import Opportunities from "@/components/guest/investment/Opportunities";
import OurProcess from "@/components/guest/investment/OurProcess";
import type { NextPage } from "next";
import React from 'react'

const Investment: NextPage = () => {

    return (
        <main className="w-full flex flex-col overflow-x-hidden bg-lightgreen/[40%]">
            <HeroSection />
            <InvestmentOffers />
            <Opportunities />
            <OurProcess />
        </main>
    );
};

export default Investment;
