"use client"

import Image from "next/image"
import { Inter } from "next/font/google"
import { useGameContext } from "@/hooks"
import styles from "./Layout.module.scss"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  [prop: string]: any
  className?: string
  children: React.ReactNode
}

export function Layout({ children, className, ...props }: LayoutProps) {
  const { state: { currentMap }} = useGameContext()

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
