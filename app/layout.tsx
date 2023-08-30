import { Inter } from 'next/font/google'
import './globals.scss'

const font = Inter({ subsets: ['latin'] })

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
      <body className={font.className}>{children}</body>
    </html>
  )
}
