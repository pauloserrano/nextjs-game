import { EVENT_TYPES } from "@/app/types"
import styles from "./ButtonIcon.module.scss"
import { CrossedSwords, SpeechBubble, Star, Walk } from "@/app/data/icons"

interface ButtonIconProps {
  icon?: React.FC<React.SVGProps<SVGElement>>
  type?: string
  filled?: boolean
  [prop: string]: any
}

export function ButtonIcon({ icon: Icon, filled, type, ...props}: ButtonIconProps) {
  const getTypeIcon = () => {
    switch(type) {
      case(EVENT_TYPES.INTERACT): return <Star className={styles.icon} />
      case(EVENT_TYPES.DIALOGUE): return <SpeechBubble className={styles.icon} />
      case(EVENT_TYPES.TRAVEL): return <Walk className={styles.icon} />
      case(EVENT_TYPES.COMBAT): return <CrossedSwords className={styles.icon} />
    }
  }

  return (
    <button {...props} className={`${styles.btn} ${filled && styles.filled} ${props.className && props.className}`}>
      {Icon && <Icon className={styles.icon} />}
      {(type && !Icon) && getTypeIcon()}
    </button>
  )
}
