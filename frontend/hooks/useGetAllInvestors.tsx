import { useReadContract } from 'wagmi'
import investmenAbi from '../abis/investment.json'



const useGetAllInvestors = () => {
    const result = useReadContract({
        abi: investmenAbi,
        address: process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS,
        functionName: "allInvestors",
      })

  return result
  
  };
  
  export default useGetAllInvestors;