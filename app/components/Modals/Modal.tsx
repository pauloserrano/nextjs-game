import styles from "./Modal.module.scss"

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
}

export function Modal({ title, description, isOpen }: ModalProps) {
  return (
    <section className={`${styles.container}`} style={{ display: !isOpen ? "none" : "flex" }}>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}
