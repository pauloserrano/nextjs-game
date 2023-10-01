import Image from "next/image"
import { Comfortaa, Volkhov } from "next/font/google"
import { Layout } from "@/layouts"
import { useGameContext } from "@/hooks"

import { MAP_ACTION_TYPES, Demo, Outside } from "@/data"
import { Star, Cog, SpeechBubble, Walk } from "@/data/icons"

import styles from "./OverworldLayout.module.scss"


const comfortaa = Comfortaa({ subsets: ['latin'] })
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"]})


export function OverworldLayout() {
  const { state, actions } = useGameContext()

  return (
    <Layout className={`${styles.container} ${comfortaa.className}`}>
      <div className={`${styles["info-container"]} ${volkhov.className}`}>
        <h3>Wimborn</h3>
        <hr />
        <p>Afternoon</p>
      </div>

      <ul className={styles["actions-container"]}>
        {state.currentMap.actions.map((action, id) => <OverworldLayout.ActionButton key={id} action={action} onClick={() => actions.handleMapChange(state.currentMap.name == "Demo" ? Outside : Demo)} />)}
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
        {state.characters.map((character, id) => (
          <li key={id}>
            <SpeechBubble className={styles["chat-icon"]} />
            <Image 
              fill
              sizes="300px" // TODO - align the portrait sizes with the responsive breakpoints
              className={styles.portrait}
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
  action: any 
  [prop: string]: any 
}

OverworldLayout.ActionButton = function ActionButton({ action, ...props }: ActionButtonProps) {
  return (
    <li {...props}>
      <div className={styles["icon-container"]}>
        { action.type === MAP_ACTION_TYPES.INTERACT && <Star />}
        { action.type === MAP_ACTION_TYPES.TALK && <SpeechBubble />}
        { action.type === MAP_ACTION_TYPES.WALK && <Walk />}
      </div>
      <p>
        {action.name}
      </p>
    </li>
    )
}
