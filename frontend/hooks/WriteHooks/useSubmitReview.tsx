import { useWriteContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useSubmitReview = () => {
    const { writeContract } = useWriteContract();

    const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;
    return useCallback(
      async (_productId:number, _review:string) => {
        try {
          const result = writeContract({
            abi: farmAbi,
            address: getAddress(contractAddress ? contractAddress : ""),
            functionName: "submitReview",
            args: [_productId, _review],
          });
          return result;
        } catch (err) {
          console.error("Error submitting Product review:", err);
          throw err;
        }
      },[writeContract]
    )
}

export default useSubmitReview