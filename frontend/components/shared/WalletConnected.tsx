/* eslint-disable @next/next/no-img-element */
'use client'
import { SUPPORTED_CHAIN_ID } from "@/constants/chain"
import { useWeb3ModalState } from "@web3modal/wagmi/react"

export const WalletConnected = ({ address, icon }: { address: string | undefined, icon: string | undefined }) => {
    const formatAddress = (address: string | undefined) => {
        return `${address?.slice(0, 6)}...${address?.slice(-4)}`
    }

    const { selectedNetworkId } = useWeb3ModalState()

    return (
        <span className="flex items-center gap-1">
            {
                Number(selectedNetworkId) !== SUPPORTED_CHAIN_ID ? (
                    <span className="text-sm">Switch to OP Sepolia</span>
                ) :
                    (
                        <>
                            <span className="w-6 h-6 rounded-full overflow-hidden">
                                <img src={icon} alt="Icon" className="w-full h-full object-cover" />
                            </span>
                            <span>{formatAddress(address)}</span>
                        </>
                    )
            }
        </span>
    )
}