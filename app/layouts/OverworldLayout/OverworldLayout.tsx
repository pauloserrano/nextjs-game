"use client"

import Image from "next/image"
import { Comfortaa, Volkhov } from "next/font/google"
import { EVENT_TYPES, MapAction } from "@/types"
import { Layout } from "@/layouts"
import { useEvent, useGameContext } from "@/hooks"
import { Cog, SpeechBubble, Sun, Paper, Chart, Character, Backpack, LinkedRings } from "@/icons"
import styles from "./OverworldLayout.module.scss"
import { ButtonIcon } from "@/app/components/ButtonIcon/ButtonIcon"
import { ActionButton } from "./ActionButton"

const comfortaa = Comfortaa({ subsets: ['latin'] })
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"]})


export function OverworldLayout() {
  const { state: { currentMap, daytime, characters, quests }} = useGameContext()
  const eventHandler = useEvent()

  function getMapActions(): MapAction[] {
    const actions: MapAction[] = []

    if (quests.length > 0){
      const mapRelatedQuests = quests
        .map(quest => quest.steps?.find(step => !step.isCompleted))
        .filter(step => step?.actions?.find(action => action.location === currentMap))
        
      console.log(mapRelatedQuests)

      // quests.map(quest => {
      //   quest.steps?actions?.map((action) => {
      //     const questAction = action as QuestAction
      //     if (questAction.map === currentMap && !quest.isCompleted) {
      //       actions.push({...action})
      //     }
      //   })
      // })
    }
    
    currentMap?.actions.forEach(action => actions.push(action))
    
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
        <p onClick={() => eventHandler({ data: {}, type: EVENT_TYPES.INTERACT})}>{daytime || ""}</p>
      </div>

      <ul className={styles["actions-container"]}>
        {getMapActions().map((action, id) => (
          <ActionButton
            key={`${id}-${action.label}`} 
            type={action.event.type} 
            name={action.label}
            onClick={() => eventHandler(action.event)}
          />
        ))}
      </ul>

      <nav className={styles["nav-container"]}>
        <ButtonIcon 
          className={styles["nav-button"]}
          title="Inventory" 
          icon={Backpack} 
          onClick={() => {}}
        />
        <ButtonIcon 
          className={styles["nav-button"]}
          title="Status" 
          icon={Character} 
          onClick={() => {}}
        />
        <ButtonIcon 
          className={styles["nav-button"]}
          title="Skill Tree" 
          icon={Chart} 
          onClick={() => {}} 
        />
        <ButtonIcon 
          className={styles["nav-button"]}
          title="Relationship" 
          icon={LinkedRings} 
          onClick={() => {}} 
        />
        <ButtonIcon 
          className={styles["nav-button"]}
          title="Journal" 
          icon={Paper} 
          onClick={() => console.log(quests)} 
        />
        <ButtonIcon 
          className={styles["nav-button"]}
          title="Settings" 
          icon={Cog} 
          onClick={() => {}} 
        />
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
