import { Comfortaa } from 'next/font/google'
import { Layout } from '@/layouts'
import { Paper, Star } from "@/app/data/icons"
import styles from "./JournalLayout.module.scss"
import { ButtonIcon } from '@/app/components/ButtonIcon/ButtonIcon'

const comfortaa = Comfortaa({ subsets: ["latin"] })

export function JournalLayout() {
  return (
    <Layout className={`${styles.container} ${comfortaa.className}`}>
      <header className={styles.header}>
        <Paper className={styles["header-icon"]} /> 
        <h1>JOURNAL</h1>
      </header>
      <div className={styles["content-container"]}>
        <nav className={styles.nav}>
          <ButtonIcon className={`${styles["nav-btn"]} ${styles.selected}`} icon={Star} />
          <ButtonIcon className={styles["nav-btn"]} icon={Star} />
          <ButtonIcon className={styles["nav-btn"]} icon={Star} />
        </nav>
        <section className={styles["category-container"]}>
          <h3>Quests</h3>
          <ul>
            <li>Prologue</li>
            <li>Chapter 1</li>
          </ul>
        </section>
        <article className={styles["info-container"]}>
          <h3>Lorem Ipsum</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae fugiat aliquam praesentium officiis omnis odit magni rerum sed voluptatum eligendi?</p>
        </article>
      </div>
    </Layout>
  )
}

function NavButton({ icon: Icon }: { icon: React.FC<React.SVGProps<SVGElement>> }) {
  return (
    <button className={styles["nav-btn"]}>
    <Star className={styles["nav-icon"]} />
  </button>
  )
}