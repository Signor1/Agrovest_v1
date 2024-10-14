import { useReadContract } from 'wagmi'
import investmenAbi from '../abis/investment.json'



const useGetAllAvailableInvestment = () => {
    const result = useReadContract({
        abi: investmenAbi,
        address: process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS,
        functionName: "allInvestableFarms",
      })

  return result
  
  };
  
  export default useGetAllAvailableInvestment;