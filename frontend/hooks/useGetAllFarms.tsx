import { useReadContract } from 'wagmi'
import farmAbi from '../abis/farm.json'



const useGetAllFarms = () => {
    const result = useReadContract({
        abi: farmAbi,
        address: process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS,
        functionName: "retrunFarms",
      })

  return result
  
  };
  
  export default useGetAllFarms;