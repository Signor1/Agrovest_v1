"use client";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";

const options: ApexOptions = {
    chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        background: "transparent",
    },
    colors: ["#9b7d24", "#374151", "#036f1c"],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "55%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
    },
    xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    },
    yaxis: {
        title: {
            text: "Activities",
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "$ " + val + " thousands";
            },
        },
    },
};

const Barchart = () => {
    const data = useMemo(() => {
        return {
            series: [
                {
                    name: "Net Profit",
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                },
                {
                    name: "Revenue",
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                },
                {
                    name: "Free Cash Flow",
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
                },
            ],
        };
    }, []);

    return (
        <div className="w-full">
            <ReactApexChart
                options={options}
                series={data.series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default Barchart;
