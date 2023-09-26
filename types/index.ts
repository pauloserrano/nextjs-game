type Character = {
  id: number
  name: string
  xp: number
  skills: Skill[]
  src: string
  stats: Stats
}

type Stats = {
  strength: number
  speed: number
  health: {
    current: number
    max: number
  }
  mana: {
    current: number
    max: number
  }
}

type Skill = {
  name: string
  description: string
}

type Dialogue = {
  text: string
  choices?: { text: string }[]
  next: number[] | null
}

type Map = {
  id: number
  name: string
  src: string
}

type Icon = {
  name: string
  src: string
}

type GameState = {
  characters: Character[]
  currentMap: Map
  isCutscenePlaying: boolean
}


export type {
  GameState,
  Character,
  Dialogue,
  Map,
  Icon
}