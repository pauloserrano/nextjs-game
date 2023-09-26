import Image from "next/image"
import { Comfortaa } from "next/font/google"
import { Layout } from "@/layouts"
import { useGameContext } from "@/hooks"
import styles from "./OverworldLayout.module.scss"

import { Demo, Outside } from "@/data"
import { Icon } from "@/types"
import { Star } from "@/data/icons"


const font = Comfortaa({ subsets: ['latin'] })

export function OverworldLayout() {
  const { state, actions } = useGameContext()

  return (
    <Layout className={`${styles.container} ${font.className}`}>
      <ul className={styles["navigation-container"]}>
        <OverworldLayout.NavButton 
          icon={Star}
          label="Notice Board"
          onClick={() => actions.handleMapChange(state.currentMap.name == "Demo" ? Outside : Demo)}
        />
        <OverworldLayout.NavButton 
          icon={Star}
          label="Home"
        />
        <OverworldLayout.NavButton 
          icon={Star}
          label="Leave"
        />
      </ul>
    </Layout>
  )
}


interface NavButtonProps { 
  label: string, 
  icon: Icon, 
  [prop: string]: any 
}

OverworldLayout.NavButton = function NavButton({ label, icon, ...props }: NavButtonProps) {
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
