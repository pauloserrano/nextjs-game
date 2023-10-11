export interface Character {
  id: number
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