"use client"

import Image from "next/image"
import { Inter } from "next/font/google"
import { useGameContext } from "@/hooks"
import { Environment, Map } from "@/app/types"
import styles from "./Layout.module.scss"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  background?: Environment | Map
  className?: string
  children: React.ReactNode
  [prop: string]: any
}

export function Layout({ background, children, className, ...props }: LayoutProps) {
  const { state: { currentMap }} = useGameContext()
  
  return (
    <div className={`${styles.container} ${className && className} ${inter.className}`} {...props}>
      { children }
      <Image 
        className={styles.map}
        alt={background?.name || currentMap?.name || "map"}
        src={background?.src || currentMap?.src || "/assets/images/maps/demo.png"}
        fill
      />
    </div>
  )
}
