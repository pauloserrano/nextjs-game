"use client"

import { Comfortaa } from "next/font/google"
import { PlayerCard, EnemyCard, SkillModal } from "@/components"
import { Layout } from "@/layouts"
import { CombatEvent } from "@/types"
import { Star, Walk } from "@/data/icons"
import styles from "./CombatLayout.module.scss"

const comfortaa = Comfortaa({ subsets: ['latin'] })

interface CombatLayoutProps {
  event: CombatEvent
  resolve: () => void
}

export function CombatLayout({ event, resolve }: CombatLayoutProps) {
  return (
    <Layout className={styles.container}>
      <section className={styles["enemy-container"]}>
        {event.content.enemyParty.map(character => (
          <EnemyCard key={character.id} character={character} />
        ))}
      </section>
      
      <section className={styles["details-container"]}>
        <SkillModal skills={event.content.playerParty[0].skills} />
      </section>

      <section className={styles["player-container"]}>
        <div className={styles["player-party"]}>
          {event.content.playerParty.map(character => (
            <PlayerCard 
              key={character.id}
              character={character}
              isSelected={false}
            />
          ))}
        </div>

        <ul className={`${styles["action-menu"]} ${comfortaa.className}`}>
          <li>
            <button>
              <Star />
              <p>Attack</p>
            </button>
          </li>
          <li>
            <button>
              <Star />
              <p>Skills</p>
            </button>
          </li>
          <li>
            <button>
              <Star />
              <p>Items</p>
            </button>
          </li>
          <li onClick={resolve}>
            <button>
              <Walk />
              <p>Run</p>
            </button>
          </li>
        </ul>

      </section>
    </Layout>
  )
}
