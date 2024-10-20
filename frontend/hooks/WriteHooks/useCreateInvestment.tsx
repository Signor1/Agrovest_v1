import { useWriteContract } from "wagmi";
import investmentAbi from "../../abis/investment.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useCreateInvestment = () => {
  const { writeContractAsync } = useWriteContract();  

  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  return useCallback(
    async (
      _farmId: number,
      _image: string,
      _name: string,
      _about: string,
      _minAmount: number,
      _endDate: number,
      _owner: string,
    ) => {
      try {
        if (!contractAddress) throw new Error("Contract address is missing.");
        const result = await writeContractAsync({ 
          abi: investmentAbi,
          address: getAddress(contractAddress),
          functionName: "createInvestment",
          args: [_farmId, _image, _name, _about, _minAmount, _endDate, _owner],
        });
        return result;
      } catch (err) {
        console.error("Error creating investment:", err);
        throw err;
      }
    },
    [writeContractAsync]
  );
};

export default useCreateInvestment;
