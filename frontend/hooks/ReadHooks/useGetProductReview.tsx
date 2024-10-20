import { useAccount, useReadContract } from 'wagmi';
import farmAbi from '../../abis/farm.json';
import { getAddress } from 'viem';

/**
 * Custom hook to fetch farm products by address
 * @returns 
 */
const useGetProductReview = (id: number) => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress? contractAddress : ""),
    functionName: "getProductReviews",
    args: [id] ,
  });

  return result;
};

export default useGetProductReview;