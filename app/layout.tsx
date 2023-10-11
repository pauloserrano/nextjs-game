import { GameContextProvider } from '@/contexts'
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
          {children}
        </GameContextProvider>
      </body>
    </html>
  )
}
