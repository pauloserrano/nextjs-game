import { EVENT_TYPES } from "./event.types"
import { MAPS_ID, Map, MapAction } from "./map.types"

export const enum QUESTS_ID {
  DEMO_001,
  DEMO_002
}

const enum REQUIREMENT_TYPE {
  LEVEL,
}

const enum REWARD_TYPE {
  MONEY,
  XP
}

export interface QuestAction extends MapAction {
  location: MAPS_ID
}

interface QuestStep {
  completed: boolean
  description: string
  action?: QuestAction
  trigger: {
    type: EVENT_TYPES,
    condition: (event: any) => void
    callback: () => void
  }
}

interface QuestRequirements {
  type: REQUIREMENT_TYPE
  value: any
}

interface QuestReward {
  type: REWARD_TYPE
  value: any
}

export interface Quest {
  id: QUESTS_ID
  name: string
  description: string
  steps: QuestStep[]
  requirements?: QuestRequirements[]
  rewards?: QuestReward[]
  completed: boolean
}
