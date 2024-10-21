/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { formatEther } from "viem";
import PortfolioAnalytics from "./PortfolioAnalytics";
import { ProductType } from "@/utils/types";

const Products = ({ data }: {data: ProductType[]}) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <section className="w-full flex flex-col gap-6 py-4">
      <h1 className="uppercase text-darkgreen font-semibold text-base md:text-xl">
        Portfolio
      </h1>

      <PortfolioAnalytics />

      <div className="w-full flex gap-0 md:ml-3">
        <Link
          href="/user/portfolio"
          className={`text-base font-medium py-2 px-4  ${path === "/user/portfolio"
              ? "bg-darkgreen text-gray-200"
              : "text-darkgreen bg-lightgreen"
            }`}
        >
          Farm
        </Link>
        <Link
          href="/user/portfolio/investments"
          className={`text-base font-medium py-2 px-4  ${path === "/user/portfolio/investments"
              ? "bg-darkgreen text-gray-200"
              : "text-darkgreen bg-lightgreen"
            }`}
        >
          Investments
        </Link>
        <Link
          href="/user/portfolio/products"
          className={`text-base font-medium py-2 px-4  ${path === "/user/portfolio/products"
              ? "bg-darkgreen text-gray-200"
              : "text-darkgreen bg-lightgreen"
            }`}
        >
          Products
        </Link>
      </div>

      {data?.length == 0 ? (
        <h1 className="md:text-2xl text-xl text-darkgreen font-medium flex w-full h-full justify-center items-center mt-8">
          You don&apos;t have a product yet
        </h1>
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
                  Add to cart
                </button>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Products;
