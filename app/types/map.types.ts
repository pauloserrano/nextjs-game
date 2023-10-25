import { Event } from "@/types"

export const enum MAPS_ID {
  DEMO,
  OUTSIDE,
  LIVING_ROOM,
  BEDROOM,
  KITCHEN,
  CORRIDOR,
  CITY_CENTER,
  MINES,
}

export const enum DAYTIMES {
  MORNING = "Morning",
  AFTERNOON = "Afternoon",
  NIGHT = "Night",
}

export interface MapAction {
  label: string,
  event: Event
}

export interface Map {
  id: MAPS_ID
  name: string
  src: string
  actions?: MapAction[]
}