"use client"

import { GameContextProvider } from '@/contexts'
import { Toast } from '@/components'
import './globals.scss'

export const metadata = {
  title: 'My RPG',
  description: 'WIP',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <GameContextProvider>
          <Toast />
          {children}
        </GameContextProvider>
      </body>
    </html>
  )
}
