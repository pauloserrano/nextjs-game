import Image from "next/image"
import { Comfortaa } from "next/font/google"
import { CharacterSheet } from "@/types"
import styles from "./PlayerCard.module.scss"


const font = Comfortaa({ subsets: ["latin"] })

interface PlayerCardProps {
  character: CharacterSheet
  isSelected?: boolean
  [prop: string]: any
}

export function PlayerCard({ character, isSelected, ...props }: PlayerCardProps) {
  return (
    <div className={`${styles.container} ${font.className} ${isSelected && styles.selected} ${props.className && props.className}`} {...props}>
      <Image 
        className={styles.portrait}
        src={character.src}
        alt="Character Portrait"
        width={768}
        height={1144}
      />
      <div className={styles["hp-container"]}>
        <progress id="hp-bar" value={character.stats.health.current} max={character.stats.health.max} />
        <label htmlFor="hp-bar" className={styles.hp}>HP</label>
        <p className={styles["hp-amount"]} data-value={character.stats.health.current}>
          {character.stats.health.current}
        </p>
      </div>
    </div>
  )
}
