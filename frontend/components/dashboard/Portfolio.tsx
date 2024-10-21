/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent, useMemo, useState } from "react";
import useGetAllFarms from "@/hooks/ReadHooks/useGetAllFarms";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import PortfolioAnalytics from "./portfolioSubRoutes/PortfolioAnalytics";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import useRegisterFarm from "@/hooks/WriteHooks/useRegisterFarm";
import { uploadImageToIPFS } from "@/utils/uploadToIPFS";
import { toast } from "sonner";
import { FarmType } from "@/utils/types";

const UserPortfolio = () => {
  const { address } = useAccount();
  const { data: allFarms } = useGetAllFarms()  as {data: FarmType[]};
  const registerFarm = useRegisterFarm();


  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  const [userFarm, setUserFarm] = useState<FarmType[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [farmOwner] = useState(address);
  const [farmLocation, setFarmLocation] = useState("");

  const handleSelectImage = async ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
    const imageHash = await uploadImageToIPFS(target.files[0]);
    setProductImage(imageHash);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerFarm(
        productName,
        productImage,
        farmLocation,
        Number(contactInfo),
        farmOwner!,
        emailAddress
      );
      toast.dismiss();
      toast.success("Farm Created Successfully!");
      setProductName("");
      setProductImage("");
      setEmailAddress("");
      setContactInfo("");
      setFarmLocation("");
      setSelectedFile(null);
      onOpenChange();
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating farm. Please try again.");
      console.error(error);
    }
  };

  useMemo(() => {
    const userFamrs = allFarms?.filter(
      (farm: FarmType) => farm.farmerAddress === address
    );
    setUserFarm(userFamrs);
  }, [address, allFarms]);
  const path = usePathname();
  const router = useRouter();

  return (
    <section className="w-full flex flex-col gap-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="uppercase text-darkgreen font-semibold text-base md:text-xl">
          Portfolio
        </h1>
        <Button
          onPress={onOpen}
          className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base"
        >
          Register Farm
        </Button>
      </div>

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

      <div className="w-full grid md:grid-cols-2 gap-8">
        {userFarm?.length == 0 ? (
          <h1 className="md:text-2xl text-xl text-darkgreen font-medium flex w-full h-full justify-center items-center mt-8">
            You have not registered a farm
          </h1>
        ) : (
          userFarm?.map((res: FarmType, index: number) => (
            <div
              key={index}
              className="bg-gray-100 rounded-[10px] p-4 shadow-lg flex flex-col items-end gap-2"
            >
              <div className="w-full h-[200px]">
                <Image
                  src={`https://gateway.pinata.cloud/ipfs/${res.business_image}`}
                  alt={res.business_name}
                  width={2480}
                  height={1360}
                  quality={100}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex w-full justify-between items-center">
                <h4 className="text-base font-semibold text-left text-gray-700">
                  {res.business_name}
                </h4>
              </div>
              <p className="text-sm text-gray-500 text-left">{`Email: ${res.business_email}`}</p>
              <p className="text-sm text-gray-500 text-left">{`Contact: ${res.business_contact}`}</p>
              <p className="text-sm text-gray-500 text-left">{`Location: ${res.business_location}`}</p>
              <button
                className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3"
                onClick={() =>
                  router.push(`/user/portfolio/${res.farm_id}`)
                }
              >
                View more
              </button>
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="z-[9999999]"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-800 capitalize">
                Add your Farm
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <form className="w-full grid gap-4" onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col items-center">
                    <div className="w-[80px] h-[80px] border-[0.5px] border-darkgreen rounded relative ">
                      {selectedFile ? (
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="profile"
                          className="w-full h-full object-cover"
                          width={440}
                          height={440}
                          priority
                          quality={100}
                        />
                      ) : (
                        <span className="relative flex justify-center items-center w-full h-full text-darkgreen">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 relative text-6xl inline-flex rounded text-gray-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            />
                          </svg>
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        className="hidden"
                        id="selectFile"
                        onChange={handleSelectImage}
                      />
                      <label
                        htmlFor="selectFile"
                        className=" absolute -right-1 p-1 rounded-full -bottom-1 cursor-pointer bg-darkgreen border-[0.5px] border-gray-700/50 font-Bebas tracking-wider text-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productName"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Farm Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      placeholder="Enter product name"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productDesc"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Farm Location
                    </label>
                    <input
                      type="text"
                      name="farmLocation"
                      id="farmLocation"
                      placeholder="Enter product description"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productDesc"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Farm Contact Information
                    </label>
                    <input
                      type="number"
                      name="contactInfo"
                      id="contactInfo"
                      placeholder="Enter product description"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="emailAddress"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Farm Email Address
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="Enter product description"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3"
                  >
                    Submit
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default UserPortfolio;
