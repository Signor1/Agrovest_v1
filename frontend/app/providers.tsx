'use client'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import Web3ModalProvider from '@/context'
import { NextUIProvider } from '@nextui-org/react'
import { config } from '@/config/config'

export function Providers({ children }: { children: React.ReactNode }) {
    const initialState = cookieToInitialState(config, headers().get('cookie'))

    return (
        <Web3ModalProvider initialState={initialState}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </Web3ModalProvider>
    )
}