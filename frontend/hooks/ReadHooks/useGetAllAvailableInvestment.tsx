import { useReadContract } from 'wagmi'
import investmenAbi from '../../abis/investment.json'
import { getAddress } from 'viem';

const useGetAllAvailableInvestment = () => {
    const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS
    const result = useReadContract({
        abi: investmenAbi,
        address: getAddress(contractAddress? contractAddress : "") ,
        functionName: "getAllInvestableFarms",
      })

  return result
  
  };
  
  export default useGetAllAvailableInvestment;