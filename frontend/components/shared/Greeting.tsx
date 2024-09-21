"use client";
import React, { useEffect, useState } from "react";

const Greeting = () => {
    const [timeOfDay, setTimeOfDay] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setTimeOfDay("morning 🌞");
        } else if (hour >= 12 && hour < 15) {
            setTimeOfDay("afternoon ☀️");
        } else if (hour >= 15 && hour <= 20) {
            setTimeOfDay("evening ⛅");
        } else {
            setTimeOfDay("night 🌃");
        }
    }, []);

    return (
        <h2 className="text-darkgreen text-base md:text-lg ml-2 font-semibold capitalize">
            Good {timeOfDay}
        </h2>
    );
};

export default Greeting;
