import { DAYTIMES, DIALOGUE_ID, CharacterSheet, Event, Map, Quest } from "@/types"
import { QUESTS_ID } from "./quest.types"

export * from "./event.types"
export * from "./character.types"
export * from "./map.types"
export * from "./dialogue.types"
export * from "./quest.types"

export interface GameState {
  currentMap?: Map
  daytime?: DAYTIMES
  event?: Event
  quests: Quest[]
  seenDialogues: Partial<{ [key in DIALOGUE_ID]: boolean }>
  completedQuests: Partial<{ [key in QUESTS_ID]: boolean }>
  characters: {
    active: CharacterSheet[]
    idle: CharacterSheet[]
  }
}
