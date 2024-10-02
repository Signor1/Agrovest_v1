"use client";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";


const options: ApexOptions = {
    chart: {
        width: 380,
        type: "pie",
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    colors: ["#D2FE75", "#9b7d24", "#036f1c", "#374151"],
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: "bottom",
                },
            },
        },
    ],
    legend: {
        position: "bottom",
    },
};

const Piechart = () => {
    const data = useMemo(() => {
        return {
            series: [44, 55, 41, 17],
        };
    }, []);



    return (
        <div className="w-full">
            <ReactApexChart
                options={options}
                series={data.series}
                type="pie"
                height={380}
            />
        </div>
    );
};

export default Piechart;
