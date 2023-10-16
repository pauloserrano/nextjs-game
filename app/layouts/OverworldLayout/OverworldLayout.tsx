"use client"

import Image from "next/image"
import { Comfortaa, Volkhov } from "next/font/google"
import { EVENT_TYPES, MapAction } from "@/types"
import { Layout } from "@/layouts"
import { useEvent, useGameContext } from "@/hooks"
import { Star, Cog, SpeechBubble, Walk, CrossedSwords, Sun, StabbedNote, FleurDeLys } from "@/icons"
import { useCustomEvent } from "@/app/hooks/useCustomEvent"
import styles from "./OverworldLayout.module.scss"

const comfortaa = Comfortaa({ subsets: ['latin'] })
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"]})


export function OverworldLayout() {
  const { state: { currentMap, daytime, characters, quests }} = useGameContext()
  const eventHandler = useEvent()
  const { publish } = useCustomEvent()


  function getMapActions(): MapAction[] {
    const actions: MapAction[] = []

    if (quests.length > 0){
      quests.map(quest => {
        quest.actions?.map((action) => {
          if (action.map === currentMap && !quest.isCompleted) {
            actions.push({...action })
          }
        })
      })
    }
    
    if (currentMap){
      currentMap.actions.map(action => actions.push(action))
    }
    
    return actions
  }

  return (
    <Layout className={`${styles.container} ${comfortaa.className}`}>
      <div className={`${styles["info-container"]} ${volkhov.className}`}>
        <div className={styles["daytime-container"]}>
          <Sun className={styles["daytime-icon"]} />
        </div>
        <h3>{currentMap?.name || ""}</h3>
        <hr />
        <p onClick={() => publish("test")}>{daytime || ""}</p>
      </div>

      <ul className={styles["actions-container"]}>
        {getMapActions().map((action, id) => (
          <OverworldLayout.ActionButton 
            key={id} 
            type={action.event.type} 
            name={action.label} 
            onClick={() => eventHandler(action.event)} 
          />
        ))}
      </ul>

      <nav className={styles["nav-container"]}>
        <button title={"Test"} onClick={() => {}}>
          <Star className={styles["nav-icon"]} />
        </button>
        <button title={"Quests"} onClick={() => console.log(quests)}>
          <StabbedNote className={styles["nav-icon"]} />
        </button>
        <button title={"Settings"}>
          <Cog className={styles["nav-icon"]} />
        </button>
      </nav>

      <ul className={styles["party-container"]}>
        {characters.active?.map(character => (
          <li key={character.id}>
            {character.id !== 0 && <SpeechBubble className={styles["chat-icon"]} />}
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
        {type === EVENT_TYPES.QUEST && <FleurDeLys />}
      </div>
      <p>
        {name}
      </p>
    </li>
  )
}
