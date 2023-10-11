import { Dialogue, CharacterSheet } from "@/types"

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
    playerParty: CharacterSheet[]
    enemyParty: CharacterSheet[]
  }
}
