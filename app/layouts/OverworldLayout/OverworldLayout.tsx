"use client"

import Image from "next/image"
import { Comfortaa, Volkhov } from "next/font/google"
import { useRouter } from "next/navigation"
import { MapAction } from "@/types"
import { Layout } from "@/layouts"
import { useCustomEvent, useEvent, useGameContext } from "@/hooks"
import { Cog, SpeechBubble, Sun, Paper, Chart, Character, Backpack, LinkedRings } from "@/icons"
import { ButtonIcon } from "@/components"
import { ActionButton } from "./ActionButton"
import styles from "./OverworldLayout.module.scss"

const comfortaa = Comfortaa({ subsets: ['latin'] })
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"]})


export function OverworldLayout() {
  const { state: { currentMap, daytime, characters, quests }} = useGameContext()
  const eventHandler = useEvent()
  const router = useRouter()
  const { listen, dispatch, remove } = useCustomEvent()

  function getMapActions(): MapAction[] {
    const questActions: MapAction[] = []
    const activeQuests = quests.filter(quest => !quest.isCompleted)

    for(let i = 0; i < activeQuests.length; i++) {
      const currStep = quests[i].steps.find(step => !step.isCompleted)

      if (currStep?.actions){
        currStep.actions.forEach(action => {
          if (action.location === currentMap) questActions.push(action)
        })
      }
    }

    let mapActions: MapAction[] = []

    if (currentMap){
      mapActions = [...currentMap.actions]
    }
    
    return [
      ...questActions,
      ...mapActions
    ]
  }

  return (
    <Layout className={`${styles.container} ${comfortaa.className}`}>
      <div className={`${styles["info-container"]} ${volkhov.className}`}>
        <div className={styles["daytime-container"]}>
          <Sun className={styles["daytime-icon"]} />
        </div>
        <h3>{currentMap?.name || ""}</h3>
        <hr />
        <p>{daytime || ""}</p>
      </div>

      <ul className={styles["actions-container"]}>
        {getMapActions().map((action, id) => (
          <ActionButton
            key={`${id}-${action.label}`} 
            type={action.event.type} 
            name={action.label}
            onClick={() => dispatch(action.event.type, action.event)}
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
          onClick={() => router.push("/journal")} 
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
