export const enum CHARACTERS_ID {
  ARION,
  JULITH,
  ELOISE,
  AYLA,
  TALIA,
  AEDINA,
}

export interface Character {
  id: CHARACTERS_ID
  name: string
  src: string
}

export interface CharacterSheet extends Character {
  level: number
  xp: number
  skills: Skill[]
  stats: Stats
}

export interface Skill {
  name: string
  description: string
}

export interface Stats {
  strength: number
  speed: number
  health: { current: number, max: number }
  mana: { current: number, max: number }
}