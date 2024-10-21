import { useWriteContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const usePurchaseProduct = () => {
  const { writeContractAsync } = useWriteContract();
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const purchaseSingleProduct = useCallback(
    async (_productId: number, _productPrice: bigint) => {
      try {
        const result = writeContractAsync({
          abi: farmAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "purchaseProduct",
          args: [_productId],
          value: _productPrice
        });
        return result;
      } catch (err) {
        console.error("Error purchasing Product:", err);
        throw err;
      }
    },
    [writeContractAsync, contractAddress]
  );

   const purchaseMultipleProducts = useCallback(
    async (products: { id: number, price: bigint }[]) => {
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
