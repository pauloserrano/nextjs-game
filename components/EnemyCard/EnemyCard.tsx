import Image from 'next/image'
import { Comfortaa } from 'next/font/google'
import { Character } from '@/types'
import styles from "./EnemyCard.module.scss"

const comfortaa = Comfortaa({ subsets: ["latin"] })

interface EnemyCard {
  character: Character
  isSelected?: boolean
}

export default function EnemyCard({ character, isSelected }: EnemyCard) {

  return (
    <div className={`${styles.container} ${comfortaa.className} ${isSelected && styles.selected}`}>
      <div className={styles["portrait-container"]}>
        <Image 
          className={styles.portrait}
          alt={character.name || "blob"}
          src={character.src || "/assets/images/enemies/blob.png"}
          width={768}
          height={1144}
        />
      </div>
      <div className={styles["info-container"]}>
        <h3 className={styles.name} data-name={"Blob"}>Blob</h3>
        <div className={styles["hp-container"]}>
          <progress id="hp" value={character.stats.health.current} max={character.stats.health.max} />
          <label htmlFor="hp">HP</label>
          <p>{character.stats.health.current}</p>
        </div>
      </div>
    </div>
  )
}
