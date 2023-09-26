import Image, { StaticImageData } from "next/image"
import { Comfortaa } from "next/font/google"
import styles from "./Card.module.scss"
import { Character } from "@/types"


const font = Comfortaa({ subsets: ["latin"] })

interface CardProps {
  [prop: string]: any
  character: Character
  isSelected?: boolean
}

export function Card({ character, isSelected, ...props }: CardProps) {
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
