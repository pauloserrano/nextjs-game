"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Layout } from "@/layouts"
import { useCustomEvent, useDialogue } from "@/hooks"
import { DialogueEvent } from "@/types"
import styles from "./DialogueLayout.module.scss"


interface DialogueLayoutProps {
  event: DialogueEvent
  resolve: () => void
}

export function DialogueLayout({ event, resolve }: DialogueLayoutProps) {
  const [text, setText] = useState<string>("")
  const { dispatch } = useCustomEvent()
  const { dialogue, active, participants, background, next } = useDialogue({ 
    dialogueId: event.data.dialogueId, 
    end: resolve
  })
  
  // Event Dispatcher
  useEffect(() => {
    if (dialogue.event){
      dispatch(dialogue.event.type, dialogue.event)
    }
  }, [dialogue.event])

  // Reset Typing
  useEffect(() => {
    setText("")
  }, [dialogue.text])

  // Dialogue Typing 
  useEffect(() => {
    if (text.length < dialogue.text.length){
      const timer = textTypingEffect()

      return () => clearTimeout(timer)
    }
  }, [text])

  function textTypingEffect() {
    return setTimeout(() => {
      setText((curr) => curr + dialogue.text[text.length]);
    }, dialogue.speed || 10);
  }

  function handleDialogue(id?: number) {
    const finishedTyping = (text.length === dialogue.text.length)
    
    if (!finishedTyping){
      setText(dialogue.text)
      return
    }
    
    next(id)
  }

  function isActive(id: number) {
    return (active?.id === id)
  }
    
  return (
    <Layout background={background} className={styles.container}>
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
        {active && <h3 className={styles["dialogue-name"]}>{active.name}</h3>}
        <p className={`${styles.dialogue} ${styles[dialogue.type]}`}>
          {text}
        </p>

        {dialogue.choices && (text.length >= dialogue.text.length)
         ? <>
            <hr />
            <ol className={styles["dialogue-choices"]}>
              {dialogue.choices?.map((choice, id) => (
                <li key={id} className={`${styles[choice.type]}`} onClick={() => handleDialogue(id)}>
                  {choice.preview}
                </li>
              ))}
            </ol>
          </>
         : <button className={styles["next-btn"]} onClick={() => handleDialogue()} />
        }
      </section>
    </Layout>
  )
}
