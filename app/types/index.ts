import { DAYTIMES, DIALOGUE_ID, CharacterSheet, Event, Map, Quest } from "@/types"

export * from "./event.types"
export * from "./character.types"
export * from "./map.types"
export * from "./dialogue.types"
export * from "./quest.types"

export interface GameState {
  currentMap?: Map
  daytime?: DAYTIMES
  event?: Event
  seenDialogues: Partial<{ [key in DIALOGUE_ID]: boolean }>
  characters: {
    active: CharacterSheet[],
    idle: CharacterSheet[]
  }
  quests: {
    ongoing: Quest[],
    completed: Quest[]
  }
}
