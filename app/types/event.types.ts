import { Dialogue, CharacterSheet, Map, MAPS_ID, DIALOGUE_ID } from "@/types"

export const enum EVENT_TYPES {
  DIALOGUE = "dialogue",
  COMBAT = "combat",
  INTERACT = "interact",
  TRAVEL = "travel"
}

export interface Event {
  name?: string
  type: EVENT_TYPES
  data: {}
  resolve?: () => void
}

export interface TravelEvent extends Event {
  data: {
    mapId: MAPS_ID
  }
}

export interface DialogueEvent extends Event {
  data: {
    dialogueId: DIALOGUE_ID
  }
}

export interface CombatEvent extends Event{
  data: {
    playerParty: CharacterSheet[]
    enemyParty: CharacterSheet[]
  }
}
