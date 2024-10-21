import useGetAllPurchasedProduct from "@/hooks/ReadHooks/useGetAllPurchasedProduct";
import { useAccount } from "wagmi";



const PortfolioAnalytics = () => {
  const { address } = useAccount();
  const { data: purchases } = useGetAllPurchasedProduct(address);
  return (
    <main className="w-full bg-gray-100 grid lg:grid-cols-5 md:grid-cols-3 gap-4">
      <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
        <h4 className="text-gray-800 font-light">Total Product</h4>
        <h1 className="text-2xl text-darkgreen font-semibold">$3,500</h1>
      </div>
      <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
        <h4 className="text-gray-800 font-light">Total Invested</h4>
        <h1 className="text-2xl text-darkgreen font-semibold">$30,500</h1>
      </div>
      <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
        <h4 className="text-gray-800 font-light">Product Sold</h4>
        <h1 className="text-2xl text-darkgreen font-semibold">15</h1>
      </div>
      <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
        <h4 className="text-gray-800 font-light">Product Purchased</h4>
        <h1 className="text-2xl text-darkgreen font-semibold">
          {purchases?.length}
        </h1>
      </div>
      <div className="rounded-[5px] p-3 flex flex-col items-center justify-center gap-2">
        <h4 className="text-gray-800 font-light">Funds Raised</h4>
        <h1 className="text-2xl text-darkgreen font-semibold">$1,500</h1>
      </div>
    </main>
  );
};

export default PortfolioAnalytics;
