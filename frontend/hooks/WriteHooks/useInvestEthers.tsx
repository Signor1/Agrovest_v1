import { useWriteContract } from "wagmi";
import investmentAbi from "../../abis/investment.json";
import { getAddress, parseEther } from "viem";
import { useCallback } from "react";

const useInvestEthers = () => {
  const { writeContractAsync } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  return useCallback(
    async (
      _farmId: number,
      _amount: bigint
    ) => {
      try {
        const result = await writeContractAsync({
          abi: investmentAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "investEthers",
          args: [_farmId],
          value: _amount,
        });
        return result;
      } catch (err) {
        console.error("Error investing:", err);
        throw err;
      }
    },
    [writeContractAsync]
  );
};

export default useInvestEthers;
