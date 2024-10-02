/* eslint-disable @next/next/no-img-element */
'use client'

export const WalletConnected = ({ address, icon }: { address: string | undefined, icon: string | undefined }) => {
    const formatAddress = (address: string | undefined) => {
        return `${address?.slice(0, 6)}...${address?.slice(-4)}`
    }

    return (
        <span className="flex items-center gap-1">
            <span className="w-6 h-6 rounded-full overflow-hidden">
                <img src={icon} alt="Icon" className="w-full h-full object-cover" />
            </span>
            <span>{formatAddress(address)}</span>
        </span>
    )
}