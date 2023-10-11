"use client"

import Image from "next/image"
import { Layout } from "@/layouts"
import { CHARACTERS_ID, characters } from "@/data"
import { DialogueEvent } from "@/types"
import styles from "./DialogueLayout.module.scss"
import { useDialogue } from "@/hooks"


interface DialogueLayoutProps {
  event: DialogueEvent
  resolve: () => void
}

export function DialogueLayout({ event, resolve }: DialogueLayoutProps) {
  const { dialogue, speakers, next } = useDialogue({ 
    script: event.content.script, 
    end: resolve 
  })

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
                <li key={id} onClick={() => next(id)}>{choice.text}</li>
              ))}
            </ol>
          </>)
         : (<button className={styles["next-btn"]} onClick={() => next()} />)}

      </section>
      
    </Layout>
  )
}
