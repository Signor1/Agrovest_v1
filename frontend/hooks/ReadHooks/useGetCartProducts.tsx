import { useReadContract } from 'wagmi';
import farmAbi from '../../abis/farm.json';
import { getAddress } from 'viem';

/**
 * Custom hook to fetch farm products by address
 * @returns 
 */
const useGetCartProducts = (address: any) => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress? contractAddress : ""),
    functionName: "getCartProducts",
    args: [address],
  });

  return result;
};

export default useGetCartProducts;