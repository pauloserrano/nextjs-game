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
  const { dialogue, active, next } = useDialogue({ 
    script: event.content.script, 
    end: resolve 
  })
  
  return (
    <Layout className={styles.container}>
      <div className={`${styles["player-side"]} ${!active?.id && styles.active}`}>
        <Image 
          className={styles.portrait}
          src={characters[CHARACTERS_ID.ARION].src}
          alt={characters[CHARACTERS_ID.ARION].name}
          width={768}
          height={1144}
        />
      </div>

      {(dialogue.speakerId) && (
        <div className={`${styles["npc-side"]} ${active?.id && styles.active}`}>
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
        <h3 className={styles["dialogue-name"]}>{active?.name}</h3>
        <p className={`${styles.dialogue} ${styles[dialogue.type]}`}>
          {dialogue.text}
        </p>

        {dialogue.choices 
         ? (<>
            <hr />
            <ol className={styles["dialogue-choices"]}>
              {dialogue.choices?.map((choice, id) => (
                <li key={id} onClick={() => next(id)} className={`${styles[dialogue.type]}`}>{choice.text}</li>
              ))}
            </ol>
          </>)
         : (<button className={styles["next-btn"]} onClick={() => next()} />)}

      </section>
      
    </Layout>
  )
}
