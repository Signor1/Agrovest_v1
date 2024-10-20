import { useWriteContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress, parseEther } from "viem";
import { useCallback } from "react";

const usePurchaseProduct = () => {
  const { writeContract } = useWriteContract();
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const purchaseSingleProduct = useCallback(
    async (_productId: number, _productPrice: number) => {
      try {
        const result = writeContract({
          abi: farmAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "purchaseProduct",
          args: [_productId, {value: parseEther(_productPrice.toString())}],
        });
        return result;
      } catch (err) {
        console.error("Error purchasing Product:", err);
        throw err;
      }
    },
    [writeContract, contractAddress]
  );

   const purchaseMultipleProducts = useCallback(
    async (products: { id: number, price: number }[]) => {
      try {
        const txResponses = await Promise.all(
          products.map(({ id, price }) => purchaseSingleProduct(id, price))
        );
        return txResponses;
      } catch (err) {
        console.error("Error in batch purchase:", err);
        throw err;
      }
    },
    [purchaseSingleProduct]
  );

  return {
    purchaseSingleProduct,
    purchaseMultipleProducts,
  };
};

export default usePurchaseProduct;
