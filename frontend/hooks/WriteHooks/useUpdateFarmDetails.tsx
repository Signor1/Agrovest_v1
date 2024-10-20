import { useWriteContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useUpdateFarmDetails = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;
  return useCallback(
    async (
      _index: number,
      _name: string,
      _image: string,
      _location: string,
      _contact_info: number,
      _email: string
    ) => {
      try {
        const result = writeContract({
          abi: farmAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "updateDetails",
          args: [_index, _name, _image, _location, _contact_info, _email],
        });
        return result;
      } catch (err) {
        console.error("Error updating farm:", err);
        throw err;
      }
    },
    [writeContract]
  );
};

export default useUpdateFarmDetails;
