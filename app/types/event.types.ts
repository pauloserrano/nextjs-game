import { CharacterSheet, MAPS_ID, DIALOGUE_ID, QUESTS_ID } from "@/types"

export const enum EVENT_TYPES {
  DIALOGUE = "dialogue",
  COMBAT = "combat",
  INTERACT = "interact",
  TRAVEL = "travel",
  QUEST = "quest",
  NOTIFICATION = "notification"
}

export interface Event {
  name?: string
  type: EVENT_TYPES
  data: {}
  trigger?: any
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

export interface CombatEvent extends Event {
  data: {
    playerParty: CharacterSheet[]
    enemyParty: CharacterSheet[]
  }
}

export interface QuestEvent extends Event {
  data: {
    questId: QUESTS_ID
  }
}

export interface NotificationEvent extends Event {
  data: {
    title: string,
    description?: string
  }
}