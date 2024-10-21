import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains'; 
import { coinbaseWallet } from 'wagmi/connectors';
 
export function getConfig() {
  return createConfig({
    chains: [baseSepolia, base], 
    connectors: [
      coinbaseWallet({
        appName: "OnchainKit",
        preference: 'smartWalletOnly',
        version: '4',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
      [base.id]: http(), 
    },
  });
}
 
declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}