"use client"

import { Comfortaa } from "next/font/google"
import { useEffect, useState } from "react"
import { PlayerCard } from "@/components"
import { Layout } from "@/layouts"
import { Character, CombatEvent } from "@/types"
import styles from "./CombatLayout.module.scss"
import { Star, Walk } from "@/data/icons"
import EnemyCard from "@/components/EnemyCard/EnemyCard"


const comfortaa = Comfortaa({ subsets: ['latin'] })

interface CombatLayoutProps {
  event: CombatEvent
  resolve: () => void
}

export function CombatLayout({ event, resolve }: CombatLayoutProps) {
  const [iniciative, setIniciative] = useState<Character[]>([])
  const [test, setTest] = useState(0)

  useEffect(() => {
    setIniciative(event.content.playerParty)
  }, [])

  const handleActive = () => {
    if (test < iniciative.length - 1) {
      return setTest(prev => ++prev)
    }

    return setTest(0)
  }

  return (
    <Layout className={styles.container}>
      <section className={styles["enemy-container"]}>
        <EnemyCard character={event.content.enemyParty[0]} />
        <EnemyCard character={event.content.enemyParty[0]} />
        <EnemyCard character={event.content.enemyParty[0]} />
        <EnemyCard character={event.content.enemyParty[0]} />
        <EnemyCard character={event.content.enemyParty[0]} />
      </section>
      
      <section className={styles["details-container"]}>
        Details {iniciative[test]?.skills[0].name}
      </section>

      <section className={styles["player-container"]}>
        <div className={styles["player-party"]}>
          {event.content.playerParty.map(char => (
            <PlayerCard 
              key={char.id}
              character={char}
              isSelected={char === iniciative[test]}
            />
          ))}
        </div>

        <ul className={`${styles["action-menu"]} ${comfortaa.className}`}>
          <li onClick={handleActive}>
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
