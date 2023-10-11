import { CharacterSheet, Event, Map } from "@/types"

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
  daytime?: string
  events: {
    current: Event | null,
    queued: Event[]
  }
}
