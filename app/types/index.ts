import { CharacterSheet, Event, Map, DAYTIMES } from "@/types"

export * from "./event.types"
export * from "./character.types"
export * from "./map.types"
export * from "./dialogue.types"

export interface GameState {
  characters: {
    active: CharacterSheet[],
    idle: CharacterSheet[]
  }
  currentMap?: Map
  daytime?: DAYTIMES
  events: {
    current: Event | null,
    queued: Event[]
  }
}
