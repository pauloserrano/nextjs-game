import Image from "next/image"
import { Comfortaa, Volkhov } from "next/font/google"
import { Layout } from "@/layouts"
import { useGameContext } from "@/hooks"
import styles from "./OverworldLayout.module.scss"

import { Demo, Outside } from "@/data"
import { Icon } from "@/types"
import { Star, Cog, Speech } from "@/data/icons"


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
        <OverworldLayout.ActionButton 
          icon={Star}
          label="Notice Board"
          onClick={() => actions.handleMapChange(state.currentMap.name == "Demo" ? Outside : Demo)}
        />
        <OverworldLayout.ActionButton 
          icon={Star}
          label="Home"
        />
        <OverworldLayout.ActionButton 
          icon={Star}
          label="Leave"
        />
      </ul>
      <nav className={styles["nav-container"]}>
        <button>
          <Image 
            fill
            alt="settings"
            src={Cog.src}
          /></button>
        <button>
          <Image 
            fill
            alt="settings"
            src={Cog.src}
          /></button>
        <button>
          <Image 
            fill
            alt="settings"
            src={Cog.src}
          /></button>
        <button>
          <Image 
            fill
            alt="settings"
            src={Cog.src}
          />
        </button>
      </nav>

      <ul className={styles["party-container"]}>
        {state.characters.map((character, id) => (
          <li key={id}>
            <Image 
              width={40}
              height={30}
              className={styles.speech}
              alt="chat"
              src={Speech.src}
            />
            <Image 
              fill
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
  label: string, 
  icon: Icon, 
  [prop: string]: any 
}

OverworldLayout.ActionButton = function ActionButton({ label, icon, ...props }: ActionButtonProps) {
  return (
    <li {...props}>
      <div className={styles["icon-container"]}>
        <Image 
          fill
          alt={icon.name || "icon"}
          src={icon.src || "/assets/icons/star.svg"}
        />
      </div>
      <p>
        {label}
      </p>
    </li>
    )
}
