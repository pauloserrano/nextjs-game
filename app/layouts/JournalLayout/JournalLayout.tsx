"use client"

import { Comfortaa } from 'next/font/google'
import { useState } from 'react'
import { Layout } from '@/layouts'
import { Exclamation, Paper, Star } from "@/app/data/icons"
import { ButtonIcon } from '@/components'
import { useGameContext } from '@/hooks'
import styles from "./JournalLayout.module.scss"
import Link from 'next/link'

const comfortaa = Comfortaa({ subsets: ["latin"] })

const enum CATEGORIES {
  QUESTS = "Quests",
  CODEX = "Codex",
  TUTORIALS = "Tutorials",
}

export function JournalLayout() {
  const { state } = useGameContext()
  const [category, setCategory] = useState<CATEGORIES>(CATEGORIES.QUESTS)
  const [selectedItem, setSelectedItem] = useState<any>()

  function changeCategory(newCategory: CATEGORIES) {
    if (newCategory === category) return

    setCategory(() => newCategory)
    setSelectedItem(() => {})
  }

  return (
    <Layout className={`${styles.container} ${comfortaa.className}`}>
      <header className={styles.header}>
        <Paper className={styles["header-icon"]} /> 
        <h1>JOURNAL</h1>
      </header>
      <div className={styles["content-container"]}>
        <nav className={styles.nav}>
          <ButtonIcon 
            className={`
              ${styles["nav-btn"]} 
              ${category === CATEGORIES.QUESTS && styles.selected}
            `} 
            title="Quests"
            icon={Exclamation}
            onClick={() => changeCategory(CATEGORIES.QUESTS)}
          />
          <ButtonIcon 
            className={`
              ${styles["nav-btn"]} 
              ${category === CATEGORIES.CODEX && styles.selected}
            `} 
            title="Codex"
            icon={Star} 
            onClick={() => changeCategory(CATEGORIES.CODEX)}
          />
          <ButtonIcon 
            className={`
              ${styles["nav-btn"]} 
              ${category === CATEGORIES.TUTORIALS && styles.selected}
            `} 
            title="Tutorials"
            icon={Star} 
            onClick={() => changeCategory(CATEGORIES.TUTORIALS)}
          />
        </nav>
        <section className={styles["category-container"]}>
          <h3>{category}</h3>
          <ul>
            {category === CATEGORIES.QUESTS && (
              state.quests.ongoing.map((quest) => (
                <li 
                  key={quest.id} 
                  className={`
                    ${styles["category-item"]} 
                    ${selectedItem === quest && styles.selected}
                  `}
                  onClick={() => setSelectedItem(quest)}
                >
                  {quest.name}
                </li>
              ))
            )}
          </ul>
          <Link className={styles["close-btn"]} href="/">Close</Link>
        </section>
        {selectedItem && (
          <article className={styles["info-container"]}>
            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.description}</p>
            {selectedItem.steps.map((step: any, id: number) => (
              <span key={id} className={step.completed && styles.done}>{step.description}</span>
            ))}
          </article>
        )}
      </div>
    </Layout>
  )
}
