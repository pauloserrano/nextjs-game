import { Event } from "@/types"

export enum DAYTIMES {
  MORNING = "Morning",
  AFTERNOON = "Afternoon",
  NIGHT = "Night",
}

export interface Map {
  id: number
  name: string
  src: string
  events: Event[]
}