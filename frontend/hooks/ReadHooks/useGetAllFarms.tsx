import { useReadContract } from 'wagmi'
import farmAbi from '../../abis/farm.json'
import { getAddress } from 'viem';



const useGetAllFarms = () => {
    const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS
    const result = useReadContract({
        abi: farmAbi,
        address: getAddress(contractAddress ? contractAddress : ""),
        functionName: "retrunFarms",
      })

  return result
  
  };
  
  export default useGetAllFarms;