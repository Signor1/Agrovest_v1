/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import useGetAllAvailableInvestment from "@/hooks/ReadHooks/useGetAllAvailableInvestment";
import { InvestmentType } from "@/utils/types";


const ExploreUserFarm = () => {

  const {data: investment} = useGetAllAvailableInvestment() as {data: InvestmentType[]}

  const router = useRouter();  

  return (
    <section className="w-full flex flex-col gap-6 py-4">
      <h1 className="uppercase text-darkgreen font-semibold text-base md:text-xl">
      Investments
      </h1>

      <div className="w-full flex justify-between items-center">
        <h3 className="md:text-2xl text-darkgreen font-medium">
          Current investment opportunities.
        </h3>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-8">
        {investment?.map((res:any, index:number) => (
          <div
            key={index}
            className="bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col items-end gap-2"
          >
            <div className="w-full h-[200px]">
              <Image
                src={`https://gateway.pinata.cloud/ipfs/${res.image}`}                
                alt={res.name}
                width={2480}
                height={1360}
                quality={100}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex w-full justify-between items-center">
              <h4 className="text-base font-semibold text-left text-gray-700">
                {res.name}
              </h4>
            </div>
            <p className="text-sm text-gray-500">{res.about}</p>
            <button
              className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3"
              onClick={() => router.push(`/user/investments/${Number(res.farmId)}`)}
            >
              View more
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ExploreUserFarm;
