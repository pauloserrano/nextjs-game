import { Event } from "@/types"

export const enum MAPS_ID {
  DEMO,
  OUTSIDE
}

export const enum DAYTIMES {
  MORNING = "Morning",
  AFTERNOON = "Afternoon",
  NIGHT = "Night",
}

export interface Map {
  id: MAPS_ID
  name: string
  src: string
  actions: {
    label: string,
    event: Event
  }[]
}