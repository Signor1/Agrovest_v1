import { useReadContract } from 'wagmi'
import investmenAbi from '../../abis/investment.json'
import { getAddress } from 'viem';




const useGetTotalInvestment = () => {
    const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS
    const result = useReadContract({
        abi: investmenAbi,
        address: getAddress(contractAddress? contractAddress : "") ,
        functionName: "getTotalInvestment",
      })

  return result
  
  };
  
  export default useGetTotalInvestment;