import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ConvexClientProvider } from '@/providers/ConvexClientProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import StoreProvider from '@/providers/StoreProvider'
import ModalProvider from '@/providers/ModalProvider'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '600', '500'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <StoreProvider>
            <ThemeProvider defaultTheme='system' enableSystem disableTransitionOnChange storageKey='wtflix-theme' attribute='class'>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
