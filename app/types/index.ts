import { DAYTIMES, CharacterSheet, Event, Map, Quest } from "@/types"

export * from "./event.types"
export * from "./character.types"
export * from "./map.types"
export * from "./dialogue.types"
export * from "./quest.types"

export interface GameState {
  currentMap?: Map
  daytime?: DAYTIMES
  characters: {
    active: CharacterSheet[],
    idle: CharacterSheet[]
  }
  event?: Event
  quests: {
    ongoing: Quest[],
    completed: Quest[]
  }
}
