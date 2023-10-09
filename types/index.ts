import { CHARACTERS_ID } from "@/data"

export interface Character {
  id: number
  name: string
  xp: number
  skills: {
    name: string
    description: string
  }[]
  src: string
  stats: {
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
}

export interface Dialogue { 
  [key: string] : {
    text: string
    speakerId?: CHARACTERS_ID
    choices?: { text: string }[]
    next: number[] | null
  }
}

export interface Map {
  id: number
  name: string
  src: string
  events: Event[]
}

export interface GameState {
  characters: Character[]
  currentMap: Map
  events: {
    current: Event | null,
    queued: Event[]
  }
}

export enum EVENT_TYPES {
  DIALOGUE = "dialogue",
  COMBAT = "combat",
  INTERACT = "interact",
  TRAVEL = "travel"
}

export interface Event {
  name: string
  type: EVENT_TYPES
  contentId: number
  content?: any
}

export interface DialogueEvent extends Event {
  content: {
    script: Dialogue
  }
}

export interface CombatEvent extends Event{
  content: {
    playerParty: Character[]
    enemyParty: Character[]
  }
}
