import { Character, CharacterSheet } from "@/types"

export function useFactory() {
  const characterSheet = (character: Character): CharacterSheet => {
    return {
      ...character,
      xp: 0,
      level: 1,
      skills: [ { name: "Heavy Attack", description: "Lorem Ipsum" } ],
      stats: {
        health: { current: 2000, max: 3000 },
        mana: { current: 100, max: 100 },
        speed: 10,
        strength: 10
      },
    }
  }
  
  return {
    create: {
      characterSheet
    }
  }
}
