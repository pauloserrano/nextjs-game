import { Map, MapAction } from "./map.types"

export const enum QUESTS_ID {
  DEMO_001
}

export interface QuestAction extends MapAction {
  map: Map
}

export interface Quest {
  id: QUESTS_ID
  name: string
  description: string
  requirements?: {}[]
  steps?: {}[]
  rewards?: {}
  actions?: QuestAction[]
  isCompleted: boolean
}