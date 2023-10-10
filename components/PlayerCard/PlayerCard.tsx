import Image from "next/image"
import { Comfortaa } from "next/font/google"
import { Character } from "@/types"
import styles from "./PlayerCard.module.scss"


const font = Comfortaa({ subsets: ["latin"] })

interface PlayerCardProps {
  [prop: string]: any
  character: Character
  isSelected?: boolean
}

export function PlayerCard({ character, isSelected, ...props }: PlayerCardProps) {
  return (
    <div className={`
        ${font.className} 
        ${styles.container} 
        ${isSelected && styles.selected}
        ${props.className? props.className : ""}
      `}
      {...props}>
      <Image 
        className={styles.portrait}
        src={character.src}
        alt="Character Portrait"
        width={768}
        height={1144}
      />

      {character.src && 
        <div className={styles["hp-container"]}>
          <div 
            className={styles["hp-bar"]} 
            data-percentage={`${(character.stats.health.current / character.stats.health.max) * 100}%`}>
            <div className={styles["hp-fill"]} />
          </div>
          <span className={styles.hp}>HP</span>
          <span 
            className={styles["hp-amount"]}
            data-value={character.stats.health.current}
          >
              {character.stats.health.current}
          </span>
        </div>
      }
    </div>
  )
}
