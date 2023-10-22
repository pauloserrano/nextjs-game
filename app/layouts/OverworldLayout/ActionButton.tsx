import { ButtonIcon } from "@/app/components/ButtonIcon/ButtonIcon"
import styles from "./OverworldLayout.module.scss"

interface ActionButtonProps { 
  type: string
  name: string
  [prop: string]: any
}

export function ActionButton({ type, name, ...props }: ActionButtonProps) {
  return (
    <li {...props} className={styles["action"]}>
      <ButtonIcon className={styles["action-icon"]} type={type} filled />
      <p className={styles["action-name"]}>{name}</p>
    </li>
  )
}
