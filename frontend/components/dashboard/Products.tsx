/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ProductType } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { formatEther } from "viem";

const Products = ({ title, data }: { title: string; data: ProductType[] }) => {
  const router = useRouter();
  return (
    <section className="w-full flex flex-col px-2 mb-20">
      <main className="w-full flex flex-col gap-6">
        <h1 className="md:text-2xl text-xl text-darkgreen font-medium">
          {title}
        </h1>
        {data?.length == 0 ? (
          <h1 className="md:text-2xl text-xl text-darkgreen font-medium flex w-full h-full justify-center items-center mt-8">You don&apos;t have a product yet</h1>
        ) : (
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {data?.map(
              (product: ProductType, index: number): JSX.Element => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col gap-2"
                >
                  <div className="w-full h-[150px]">
                    <Image
                      src={`https://gateway.pinata.cloud/ipfs/${product.product_image}`}
                      alt="farm produce"
                      width={300}
                      height={217}
                      quality={100}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <h4 className="text-base font-semibold text-gray-700">
                      {product.product_name}
                    </h4>
                    <p className="text-gray-700">
                      {`${formatEther(BigInt(product.product_price))}`}{" "}
                      <span className="font-semibold">ETH</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {product.product_description}
                  </p>
                  <button
                    className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[10px] text-base"
                    onClick={() =>
                      router.push(`/user/marketplace/${product.product_id}`)
                    }
                  >
                    View Product Details
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </section>
  );
};

export default Products;
