import { CHARACTERS_ID } from "@/data"

export interface Dialogue { 
  [key: string] : {
    text: string
    speakerId?: CHARACTERS_ID
    choices?: { text: string }[]
    next: string[] | null
  }
}

export interface rawDialogue {
  text: string,
  speakerId?: number,
  choices?: rawDialogue[]
}
