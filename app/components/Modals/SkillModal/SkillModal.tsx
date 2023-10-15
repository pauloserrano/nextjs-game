import { CharacterSheet } from "@/types"
import styles from "./SkillModal.module.scss"
import { Star } from "@/icons"
import { Comfortaa } from "next/font/google"

const comfortaa = Comfortaa({ subsets: ["latin"] })

interface SkillModalProps {
  skills: CharacterSheet["skills"]
}

export function SkillModal({ skills }: SkillModalProps) {
  return (
    <section className={`${styles.container} ${comfortaa.className}`}>
      <h2 className={styles.title}>SKILLS</h2>
      <hr />
      <ul className={styles["skill-list"]}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            <Star className={styles["skill-icon"]} />
            <p className={styles["skill-name"]}>{skill.name}</p>
            <p className={styles["skill-cost"]}>2 MP</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
