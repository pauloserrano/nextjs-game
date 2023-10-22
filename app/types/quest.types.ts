import { Map, MapAction } from "./map.types"

export const enum QUESTS_ID {
  DEMO_001,
  DEMO_002
}

export interface QuestAction extends MapAction {
  location: Map
}

export interface Quest {
  id: QUESTS_ID
  name: string
  description: string
  steps: {
    name?: string
    description: string
    actions?: QuestAction[]
    isCompleted: boolean
    onStart?: () => void
  }[]
  requirements?: {}[]
  rewards?: {}
  isCompleted: boolean
}

interface QuestStep {
  type: REWARD_TYPE
  value: any
}

const enum REQUIREMENT_TYPE {

}

interface QuestRequirements {
  type: REQUIREMENT_TYPE
  value: any
}

const enum REWARD_TYPE {
  
}

interface QuestReward {
  type: REWARD_TYPE
  value: any
}