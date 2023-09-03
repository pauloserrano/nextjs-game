"use client"

import { Card } from "@/components"
import styles from "./CombatLayout.module.scss"

interface CombatLayoutProps {
  children?: React.ReactNode
}

export function CombatLayout({ children }: CombatLayoutProps) {
  return (
    <article className={styles.container}>
      <section className={styles["enemy-container"]}>
        Enemy Container
      </section>
      
      <section className={styles["details-container"]}>
        Details {children}
      </section>

      <section className={styles["player-container"]}>
        <div className={styles["player-party"]}>
          <Card />
          <Card isSelected />
          <Card />
          <Card />
          <Card />
        </div>
        <ul className={styles["action-menu"]}>
          <li>Attack</li>
          <li>Skills</li>
          <li>Items</li>
          <li>Run</li>
        </ul>
      </section>
    </article>
  )
}
