import { DAYTIMES, CharacterSheet, Event, Map, Quest } from "@/types"

export * from "./event.types"
export * from "./character.types"
export * from "./map.types"
export * from "./dialogue.types"
export * from "./quest.types"

export interface GameState {
  characters: {
    active: CharacterSheet[],
    idle: CharacterSheet[]
  }
  events: {
    current: Event | null,
    queued: Event[]
  }
  quests: Quest[]
  currentMap?: Map
  daytime?: DAYTIMES
}
