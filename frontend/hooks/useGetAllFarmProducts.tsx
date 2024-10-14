import { useReadContract } from 'wagmi'
import farmAbi from '../abis/farm.json'



const useGetAllFarmProducts = () => {
    const result = useReadContract({
        abi: farmAbi,
        address: process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS,
        functionName: "getAllFarmProducts",
      })

  return result
  
  };
  
  export default useGetAllFarmProducts;