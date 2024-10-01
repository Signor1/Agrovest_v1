import { Montserrat as FontSans } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { getMetadata } from "@/utils/getMetadata";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import Web3ModalProvider from '@/context'
import { config } from "@/config/config";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = getMetadata({
  title: "AgroVest",
  description: "Tokenize your business, attract investors, while showcasing your products on a thriving marketplace. ",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen antialiased bg-white",
          fontSans.variable
        )}
      >
        <Web3ModalProvider initialState={initialState}>
          <Providers>
            {children}
          </Providers>
          <Toaster richColors />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
