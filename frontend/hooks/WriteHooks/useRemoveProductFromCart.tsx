import { useWriteContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useRemoveProductFromCart = () => {
    const { writeContract } = useWriteContract();

    const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;
    return useCallback(
      async (_productId:number) => {
        try {
          const result = writeContract({
            abi: farmAbi,
            address: getAddress(contractAddress ? contractAddress : ""),
            functionName: "removeProductFromCart",
            args: [_productId],
          });
          return result;
        } catch (err) {
          console.error("Error removing Product from cart:", err);
          throw err;
        }
      },[writeContract]
    )
}

export default useRemoveProductFromCart