import { useBalance } from 'wagmi';
import { getConfig } from '@/config/config';
import { getAddress } from 'viem';



const useGetTotalInvestment = () => {
    const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS
    const result: any = useBalance({
        address: getAddress(contractAddress? contractAddress: ""),
        config: getConfig(),
      })
  return result
  
  };
  
  export default useGetTotalInvestment;