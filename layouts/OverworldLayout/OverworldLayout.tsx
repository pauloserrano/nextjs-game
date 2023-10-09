"use client"

import Image from "next/image"
import { Comfortaa, Volkhov } from "next/font/google"
import { Layout } from "@/layouts"
import { useEvent, useGameContext } from "@/hooks"
import { Star, Cog, SpeechBubble, Walk } from "@/data/icons"

import styles from "./OverworldLayout.module.scss"
import { EVENT_TYPES } from "@/types"


const comfortaa = Comfortaa({ subsets: ['latin'] })
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"]})

interface OverworldLayoutProps {

}

export function OverworldLayout({ }: OverworldLayoutProps) {
  const { state } = useGameContext()
  const eventHandler = useEvent()

  return (
    <Layout className={`${styles.container} ${comfortaa.className}`}>
      <div className={`${styles["info-container"]} ${volkhov.className}`}>
        <h3>{state.currentMap.name}</h3>
        <hr />
        <p>Afternoon</p>
      </div>

      <ul className={styles["actions-container"]}>
        {state.currentMap.events.map((event, id) => (
          <OverworldLayout.ActionButton 
            key={id} 
            type={event.type} 
            name={event.name} 
            onClick={() => eventHandler(event)} 
          />
        ))}
      </ul>

      <nav className={styles["nav-container"]}>
        <button>
          <Cog className={styles["nav-icon"]} />
        </button>
        <button>
          <Cog className={styles["nav-icon"]} />
        </button>
        <button>
          <Cog className={styles["nav-icon"]} />
        </button>
      </nav>

      <ul className={styles["party-container"]}>
        {state.characters.active.map((character, id) => (
          <li key={id}>
            <SpeechBubble className={styles["chat-icon"]} />
            <Image 
              fill
              sizes="(max-width: 2000px) 300px" // TODO - align the portrait sizes with the responsive breakpoints
              className={`${styles.portrait} charId-${character.id}`}
              alt={character.name}
              src={character.src}
            />
          </li>
        ))}
      </ul>
    </Layout>
  )
}


interface ActionButtonProps { 
  type: string
  name: string
  [prop: string]: any
}

OverworldLayout.ActionButton = function ActionButton({ type, name, ...props }: ActionButtonProps) {
  return (
    <li {...props}>
      <div className={styles["icon-container"]}>
        {type === EVENT_TYPES.INTERACT && <Star />}
        {type === EVENT_TYPES.DIALOGUE && <SpeechBubble />}
        {type === EVENT_TYPES.TRAVEL && <Walk />}
      </div>
      <p>
        {name}
      </p>
    </li>
  )
}
