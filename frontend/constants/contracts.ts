import { ethers } from "ethers";
import daoAbi from "../abis/DAO.json";
import farmAbi from "../abis/farm.json";
import farmEscrowAbi from "../abis/farmEscrow.json";
import investmentAbi from "../abis/investment.json";
import tokenABi from "../abis/TokenAbi.json";

export const getDAO = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    `${process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS}`,
    daoAbi,
    providerOrSigner
  );

export const getFarm = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    `${process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS}`,
    farmAbi,
    providerOrSigner
  );

export const getFarmEscrow = (
  providerOrSigner: ethers.Provider | ethers.Signer
) =>
  new ethers.Contract(
    `${process.env.NEXT_PUBLIC_FARM_ESCROW_CONTRACT_ADDRESS}`,
    farmEscrowAbi,
    providerOrSigner
  );

export const getInvestment = (
  providerOrSigner: ethers.Provider | ethers.Signer
) =>
  new ethers.Contract(
    `${process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS}`,
    investmentAbi,
    providerOrSigner
  );

export const getToken = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    `${process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS}`,
    tokenABi,
    providerOrSigner
  );
