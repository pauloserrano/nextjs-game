"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components"
import { Layout } from "@/layouts"
import { Character, CombatEvent, Event } from "@/types"

import styles from "./CombatLayout.module.scss"


interface CombatLayoutProps {
  event: CombatEvent
  resolve: () => void
}

export function CombatLayout({ event }: CombatLayoutProps) {
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
        Enemy Container
      </section>
      
      <section className={styles["details-container"]}>
        Details {iniciative[test]?.skills[0].name}
      </section>

      <section className={styles["player-container"]}>
        <div className={styles["player-party"]}>
          {event.content.playerParty.map(char => (
            <Card 
              key={char.id}
              character={char}
              isSelected={char === iniciative[test]}
            />
          ))}
        </div>
        <ul className={styles["action-menu"]}>
          <li onClick={handleActive}>Attack</li>
          <li>Skills</li>
          <li>Items</li>
          <li>Run</li>
        </ul>
      </section>
    </Layout>
  )
}
