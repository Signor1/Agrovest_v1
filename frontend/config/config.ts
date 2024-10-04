import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { optimismSepolia } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "AgroVest",
  description:
    "Tokenize your business, attract investors, while showcasing your products on a thriving marketplace.",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["/favicon.ico"],
};

// Create wagmiConfig
const chains = [optimismSepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
