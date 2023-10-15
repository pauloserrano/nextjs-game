"use client"

import Image from "next/image"
import { Comfortaa, Volkhov } from "next/font/google"
import { EVENT_TYPES } from "@/types"
import { Layout } from "@/layouts"
import { useEvent, useGameContext } from "@/hooks"
import { Star, Cog, SpeechBubble, Walk, CrossedSwords, Sun } from "@/icons"
import styles from "./OverworldLayout.module.scss"

const comfortaa = Comfortaa({ subsets: ['latin'] })
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"]})


export function OverworldLayout() {
  const { state: { currentMap, daytime, characters }} = useGameContext()
  const eventHandler = useEvent()

  return (
    <Layout className={`${styles.container} ${comfortaa.className}`}>
      <div className={`${styles["info-container"]} ${volkhov.className}`}>
        <div className={styles["daytime-container"]}>
          <Sun className={styles["daytime-icon"]} />
        </div>
        <h3>{currentMap?.name || "lorem"}</h3>
        <hr />
        <p>{daytime || "ipsum"}</p>
      </div>

      <ul className={styles["actions-container"]}>
        {currentMap?.actions.map((action, id) => (
          <OverworldLayout.ActionButton 
            key={id} 
            type={action.event.type} 
            name={action.label} 
            onClick={() => eventHandler(action.event)} 
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
        {characters.active?.map(character => (
          <li key={character.id}>
            <SpeechBubble className={styles["chat-icon"]} />
            <Image 
              fill
              sizes="(max-width: 2000px) 300px"
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
        {type === EVENT_TYPES.COMBAT && <CrossedSwords />}
      </div>
      <p>
        {name}
      </p>
    </li>
  )
}
