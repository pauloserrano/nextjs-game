import { Event } from "@/types"

export const enum MAPS_ID {
  DEMO,
  OUTSIDE,
  LIVING_ROOM,
  BEDROOM,
  KITCHEN,
  CORRIDOR,
  CITY_CENTER,
}

export const enum DAYTIMES {
  MORNING = "Morning",
  AFTERNOON = "Afternoon",
  NIGHT = "Night",
}

export interface Environment {
  id: MAPS_ID
  name: string
  src: string
}

export interface MapAction {
  label: string,
  event: Event
}

export interface Map extends Environment{
  actions: MapAction[]
}