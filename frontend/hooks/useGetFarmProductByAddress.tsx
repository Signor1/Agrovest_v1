import { useAccount, useReadContract } from 'wagmi';
import farmAbi from '../abis/farm.json';

/**
 * Custom hook to fetch farm products by address
 * @returns 
 */
const useGetFarmProductByAddress = () => {
  const { address } = useAccount();

  const result = useReadContract({
    abi: farmAbi,
    address: process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS,
    functionName: "getFarmProducts",
    args: address ? [address] : [],
  });

  return result;
};

export default useGetFarmProductByAddress;