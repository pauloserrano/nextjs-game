"use client"

import Image from "next/image"
import { Inter } from "next/font/google"
import { useGameContext } from "@/hooks"
import { Map } from "@/app/types"
import styles from "./Layout.module.scss"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  background?: Map
  className?: string
  children: React.ReactNode
  [prop: string]: any
}

export function Layout({ background, children, className, ...props }: LayoutProps) {
  const { state: { currentMap }} = useGameContext()

  return (
    <div className={`${styles.container} ${inter.className} ${className ? className : ""}`} {...props}>
      { children }
      {currentMap && (
        <Image 
          className={styles.map}
          alt={background?.name || currentMap.name}
          src={background?.src || currentMap.src}
          fill
        />
      )}
    </div>
  )
}
