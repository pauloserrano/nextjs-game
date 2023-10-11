import { CHARACTERS_ID } from "@/data"

export interface Dialogue { 
  [key: string] : {
    text: string
    speakerId?: CHARACTERS_ID
    choices?: { text: string }[]
    next: number[] | null
  }
}
