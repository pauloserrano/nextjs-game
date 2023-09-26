"use client"

import { useState } from "react"
import { Layout } from "@/layouts"
import styles from "./DialogueLayout.module.scss"
import { demo } from "@/data/dialogues/intro"

interface DialogueLayoutProps {
  children?: React.ReactNode
}

export function DialogueLayout({ children }: DialogueLayoutProps) {
  const [dialogue, setDialogue] = useState(demo[0])

  const handleDialogue = (id?: number) => {
    if (dialogue.next === null) {
      return setDialogue(demo[0])
    }

    const nextIndex = dialogue.next[id || 0]

    setDialogue(() => demo[nextIndex])
  }


  return (
    <Layout className={styles.container}>
      <section className={styles["dialogue-container"]}>
        <div className={styles.dialogue}>{dialogue.text}</div>
        {dialogue.choices 
         ? (
          <ol className={styles["dialogue-choices"]}>
            {dialogue.choices?.map((choice, id) => (
              <li key={id} onClick={() => handleDialogue(id)}>{choice.text}</li>
            ))}
          </ol>
         )
         : (<button className={styles["next-btn"]} onClick={() => handleDialogue()} />)
        }
      </section>
    </Layout>
  )
}
