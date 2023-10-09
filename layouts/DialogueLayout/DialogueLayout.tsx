"use client"

import Image from "next/image"
import { useState } from "react"
import { Layout } from "@/layouts"
import { CHARACTERS_ID, characters } from "@/data"
import { DialogueEvent, Event } from "@/types"
import styles from "./DialogueLayout.module.scss"

interface DialogueLayoutProps {
  event: DialogueEvent
  resolve: () => void
}

export function DialogueLayout({ event, resolve }: DialogueLayoutProps) {
  const [dialogue, setDialogue] = useState(event.content.script[0])

  const handleDialogue = (id?: number) => {
    if (dialogue.next === null) {
      return resolve()
    }

    const nextIndex = dialogue.next[id || 0]

    setDialogue(() => event.content.script[nextIndex])
  }

  return (
    <Layout className={styles.container}>
      <div className={`${styles["player-side"]} ${styles.active}`}>
        <Image 
          className={styles.portrait}
          src={characters[CHARACTERS_ID.HERO].src}
          alt={characters[CHARACTERS_ID.HERO].name}
          width={768}
          height={1144} 
        />
      </div>

      {dialogue.speakerId && (
        <div className={styles["npc-side"]}>
        <Image 
            className={styles.portrait}
            src={characters[dialogue.speakerId].src}
            alt="Character Portrait"
            width={768}
            height={1144} 
          />
        </div>
      )}


      <section className={styles["dialogue-container"]}>
        <div className={styles.dialogue}>{dialogue.text}</div>

        {dialogue.choices 
         ? (<>
            <hr />
            <ol className={styles["dialogue-choices"]}>
              {dialogue.choices?.map((choice, id) => (
                <li key={id} onClick={() => handleDialogue(id)}>{choice.text}</li>
              ))}
            </ol>
          </>)
         : (<button className={styles["next-btn"]} onClick={() => handleDialogue()} />)}

      </section>
      
    </Layout>
  )
}
