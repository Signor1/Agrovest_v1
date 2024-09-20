import React from "react";
import type { NextPage } from "next";
import HeroSection from "@/components/guest/home/HeroSection";
import AboutSection from "@/components/guest/home/AboutSection";
import OurOffers from "@/components/guest/home/OurOffers";
import OurProcess from "@/components/guest/home/OurProcess";


const Home: NextPage = () => {

  return (
    <main className="w-full flex flex-col overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <OurOffers />
      <OurProcess />
    </main>
  );
};

export default Home;
