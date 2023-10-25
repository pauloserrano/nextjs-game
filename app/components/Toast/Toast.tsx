import styles from "./Toast.module.scss"

interface ToastProps {
  title: string
  description?: string
  [prop: string]: any
}

export function Toast({ title, description, ...props}: ToastProps) {
  return (
    <article className={`${styles.container} ${props.className ? props.className : ""}`}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
    </article>
  )
}
