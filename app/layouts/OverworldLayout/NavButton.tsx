import styles from "./OverworldLayout.module.scss"

interface NavButtonProps {
  title?: string
  icon: React.FC<React.SVGProps<SVGElement>>
  [prop: string]: any
}

export function NavButton({ icon: Icon, title, ...props}: NavButtonProps) {
  return (
    <button title={title} className={styles["nav-button"]} {...props}>
      <Icon className={styles["nav-icon"]} />
    </button>
  )
}
