"use client"

import Image from "next/image"
import { useGameContext } from "@/hooks"
import styles from "./Layout.module.scss"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  children: React.ReactNode
  className?: string
  [prop: string]: any
}

export function Layout({ children, className, ...props }: LayoutProps) {
  const { state: { currentMap } } = useGameContext()

  return (
    <div className={`${styles.container} ${className && className} ${inter.className}`} {...props}>
      { children }
      <Image 
        className={styles.map}
        alt={currentMap?.name || "map"}
        src={currentMap?.src || "/assets/images/maps/demo.png"}
        fill
      />
    </div>
  )
}
