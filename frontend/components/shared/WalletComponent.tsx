/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export function WalletComponents() {
  const router = useRouter();

 const { status } = useAccount();
 useEffect(() => {
    if (status === "connected") {
      router.push('/user')
    } else {
      router.push("/")
    }
  }, [status, router])
  
  
  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet
          className={`md:px-8 px-6 py-2.5 font-medium text-sm rounded-[10px] bg-lightgreen text-darkgreen`}
        >
          {/* <Avatar className="h-6 w-6" /> */}
          {/* <Name /> */}
        </ConnectWallet>
        <WalletDropdown>
          {/* <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick >
              <Avatar />
              <Name />
              <Address className={color.foregroundMuted} />
            </Identity> */}
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
