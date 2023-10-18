"use client"

import Image from "next/image"
import { Layout } from "@/layouts"
import { useDialogue, useEvent } from "@/hooks"
import { DialogueEvent } from "@/types"
import styles from "./DialogueLayout.module.scss"


interface DialogueLayoutProps {
  event: DialogueEvent
  resolve: () => void
}

export function DialogueLayout({ event, resolve }: DialogueLayoutProps) {
  const eventHandler = useEvent()
  const { dialogue, active, participants, next } = useDialogue({ 
    dialogueId: event.data.dialogueId, 
    end: resolve 
  })

  function handleDialogue(id?: number) {
    if (dialogue.event){
      eventHandler(dialogue.event)
    }
    
    next(id)
  }

  function isActive(id: number) {
    return (active?.id === id)
  }
  
  return (
    <Layout className={styles.container}>
      <div className={`${styles["player-side"]} ${isActive(participants.controlled?.id) && styles.active}`}>
        <Image 
          className={styles.portrait}
          src={participants.controlled.src}
          alt={participants.controlled.name}
          width={768}
          height={1144}
        />
      </div>

      {(participants.npc) && (
        <div className={`${styles["npc-side"]} ${isActive(participants.npc?.id) && styles.active}`}>
        <Image 
            className={styles.portrait}
            src={participants.npc.src}
            alt={participants.npc.name}
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
                <li key={id} onClick={() => handleDialogue(id)} className={`${styles[choice.type]}`}>{choice.preview}</li>
              ))}
            </ol>
          </>)
         : (<button className={styles["next-btn"]} onClick={() => handleDialogue()} />)}

      </section>
    </Layout>
  )
}
