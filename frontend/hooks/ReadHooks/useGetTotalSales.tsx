import { useAccount, useReadContract } from 'wagmi';
import farmAbi from '../../abis/farm.json';
import { getAddress } from 'viem';

/**
 * Custom hook to fetch farm products by address
 * @returns 
 */
const useGetTotalSales = () => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress? contractAddress : ""),
    functionName: "getTotalSale",
  });

  return result;
};

export default useGetTotalSales;