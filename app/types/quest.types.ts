import { Event } from "./event.types"
import { Map, MapAction } from "./map.types"

export const enum QUESTS_ID {
  DEMO_001,
  DEMO_002
}

export interface QuestAction extends MapAction {
  location: Map
}

interface QuestStep {
  description: string
  actions?: QuestAction[]
  isCompleted: boolean
  onStart?: () => void
}

export interface Quest {
  id: QUESTS_ID
  name: string
  description: string
  isCompleted: boolean
  requirements?: {}[]
  rewards?: {}
  steps?: QuestStep[]
}