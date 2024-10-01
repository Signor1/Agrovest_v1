export const SUPPORTED_CHAIN_ID = 11155420;

export const isSupportedChain = (
  chainId: number | undefined
): chainId is number =>
  chainId !== undefined && Number(chainId) === SUPPORTED_CHAIN_ID;

//11155420 for base sepolia
