import { useReadContract } from 'wagmi'
import farmAbi from '../../abis/farm.json'
import { getAddress } from 'viem';



const useGetAllFarmProducts = () => {
    const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS
    const result = useReadContract({
        abi: farmAbi,
        address: getAddress(contractAddress? contractAddress: ""),
        functionName: "getAllFarmProducts",
      })

  return result
  
  };
  
  export default useGetAllFarmProducts;