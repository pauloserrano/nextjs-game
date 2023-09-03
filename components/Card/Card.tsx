import Image from "next/image"
import { Comfortaa } from "next/font/google"
import hero from "@/public/assets/images/hero.png"

import styles from "./Card.module.scss"


const font = Comfortaa({ subsets: ["latin"] })

interface CardProps {
  [prop: string]: any
  isSelected?: boolean
}

export function Card({ isSelected, ...otherProps }: CardProps) {
  return (
    <div className={`${styles.container} ${font.className} ${isSelected && styles.selected}`} {...otherProps}>
      <Image 
        className={styles.portrait}
        src={hero}
        alt="hero"
      />
      <div className={styles["hp-container"]}>
        <div className={styles["hp-bar"]}></div>
        <span className={styles.hp}>HP</span>
        <span className={styles["hp-amount"]} data-value="2000">2000</span>
      </div>
    </div>
  )
}
