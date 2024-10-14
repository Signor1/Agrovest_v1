import { useBalance } from 'wagmi';
import { getConfig } from '@/config/config';



const useGetTotalInvestment = () => {
    const result: any = useBalance({
        address: process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS,
        getConfig,
      })
  return result
  
  };
  
  export default useGetTotalInvestment;