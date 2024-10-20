import { useWriteContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useRegisterFarm = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;
  return useCallback(
    async (
      _name: string,
      _image: string,
      _location: string,
      _contact_info: number,
      _address: string,
      _email: string
    ) => {
      try {
        const result = writeContract({
          abi: farmAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "registerFarms",
          args: [_name, _image, _location, _contact_info, _address, _email],
        });
        return result;
      } catch (err) {
        console.error("Error registering farm:", err);
        throw err;
      }
    },
    [writeContract]
  );
};

export default useRegisterFarm;
