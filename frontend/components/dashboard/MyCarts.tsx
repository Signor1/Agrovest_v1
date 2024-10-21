/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useAccount } from "wagmi";
import useGetCartProducts from "@/hooks/ReadHooks/useGetCartProducts";
import { formatEther } from "viem";
import usePurchaseProduct from "@/hooks/WriteHooks/usePurchaseProduct";
import { toast } from "sonner";
import useRemoveProductFromCart from "@/hooks/WriteHooks/useRemoveProductFromCart";
import { ProductType } from "@/utils/types";

const MyCarts = () => {
  // Hook calls
  const { address } = useAccount();
  const { data: initialCartItems } = useGetCartProducts(address) as { data: ProductType[] };
  const {purchaseMultipleProducts} = usePurchaseProduct();
  const removeProduct = useRemoveProductFromCart();

  const productsToPurchase = initialCartItems?.map((product: { product_id: number; product_price: number }) => ({
    id: Number(product.product_id),
    price: BigInt(product.product_price),
  }));


  const handlePurchaseProduct=async()=>{
    try{
      await purchaseMultipleProducts(productsToPurchase);
      toast.dismiss()
      toast.success("Product purchased Successfully!");

    } catch (error) {
      toast.dismiss();
      toast.error("Error purchasing products");
      console.error(error);
    }
  }

  const path = usePathname();
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const handleRemoveFromCart = async(id: number) =>{
    try {
      await removeProduct(id)
      toast.dismiss();
      toast.success("Product removed from cart successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Error removing product from cart. Please try again.");
      console.error(err);
    }
  }

  useEffect(() => {
    if (initialCartItems) {
      setCartItems(
        initialCartItems.map((item: ProductType) => ({ ...item, quantity: 1 }))
      );
    }
  }, [initialCartItems]);

  // Calculate the subtotal using useMemo to memoize the calculation
  const subtotal = useMemo(() => {
    return cartItems?.reduce(
      (acc: number, item: ProductType) => acc + Number(item.product_price) * item.quantity,
      0
    );
  }, [cartItems]);

  // Fixed discount rate (2%)
  const discountRate = 0.02;

  // Calculate the discount based on the fixed rate
  const discount = useMemo(() => {
    return subtotal * discountRate;
  }, [subtotal]);

  // Calculate the total using useMemo
  const total = useMemo(() => {
    return subtotal - discount;
  }, [subtotal, discount]);

  return (
    <section className="w-full flex flex-col gap-6 py-4">
      <h1 className="uppercase text-darkgreen font-semibold text-base md:text-xl">
        Transactions
      </h1>

      <div className="w-full flex gap-0 md:ml-3">
        <Link
          href="/user/transactions"
          className={`text-base font-medium py-2 px-4  ${path === "/user/transactions"
              ? "bg-darkgreen text-gray-200"
              : "text-darkgreen bg-lightgreen"
            }`}
        >
          Cart
        </Link>
        <Link
          href="/user/transactions/purchased"
          className={`text-base font-medium py-2 px-4  ${path === "/user/transactions/purchased"
              ? "bg-darkgreen text-gray-200"
              : "text-darkgreen bg-lightgreen"
            }`}
        >
          Purchased
        </Link>
      </div>

      <div className="w-full flex md:flex-row flex-col items-start gap-6 ">
        <div className="flex-1 bg-gray-100 p-4 rounded">
          <Table>
            <TableHeader>
              <TableRow className="text-gray-800">
                <TableHead className="text-start">Product</TableHead>
                <TableHead className="text-center">Total(ETH)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems?.map((item: ProductType, index: number) => (
                <TableRow key={index} className="text-gray-600">
                  <TableCell className="font-medium text-start">
                    <div className="flex items-center gap-2">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          src={`https://gateway.pinata.cloud/ipfs/${item.product_image}`}
                          alt={item.product_name}
                          width={640}
                          height={427}
                          quality={100}
                          priority
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-gray-700 font-semibold text-sm">
                          {item.product_name}
                        </h3>
                        <p className="text-gray-600 text-xs">Obasanjo Farm</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center font-semibold">
                    {formatEther(
                      BigInt(Number(item.product_price))
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <button
                        className="bg-darkgreen text-gray-200 flex justify-center items-center p-2 rounded-md text-xs"
                        onClick={() => handleRemoveFromCart(Number(item.product_id))}
                      >
                       Remove from cart
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="md:w-[35%] w-full bg-gray-100 rounded flex flex-col">
          <h3 className="p-4 text-gray-700 font-semibold">Order Summary</h3>
          <ul className="w-full flex flex-col gap-3 list-none p-4 border-t-[1px] border-gray-300">
            <li className="flex w-full justify-between items-center">
              <p className="text-gray-600 font-medium">Subtotal</p>
              <p className="text-gray-700 font-semibold">
                {formatEther(BigInt((subtotal)))} ETH
              </p>
            </li>
            <li className="flex w-full justify-between items-center">
              <p className="text-gray-600 font-medium">Discount (2%)</p>
              <p className="text-gray-700 font-semibold">
                {formatEther(BigInt(discount))} ETH
              </p>
            </li>
            <li className="flex w-full justify-between items-center">
              <p className="text-gray-600 font-medium">Total</p>
              <p className="text-gray-700 font-semibold">
                {formatEther(BigInt(total))} ETH
              </p>
            </li>
            <li className="w-full">
              <Button
                type="button"
                className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] w-full text-base mt-3"
                onClick={() => handlePurchaseProduct()}
              >
                Make Payment
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MyCarts;
