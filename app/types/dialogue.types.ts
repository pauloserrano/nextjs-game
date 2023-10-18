import { CHARACTERS_ID } from "./character.types"
import { Event } from "./event.types"

export const enum DIALOGUE_ID {
  INTRO
}

export const enum TEXT_TYPE {
  SPEECH = "speech",
  THOUGHT = "thought",
}

export interface Dialogue { 
  [key: string] : DialogueLine
}

export interface DialogueLine {
  text: string[]
  type: TEXT_TYPE
  speakerId?: CHARACTERS_ID
  event?: Event
  next: string[] | null
  choices?: {
    preview: string
    type: string
    event?: Event
  }[]
}

export interface RawDialogue {
  text: string[],
  type?: TEXT_TYPE
  speakerId?: CHARACTERS_ID,
  event?: Event
  choices?: {
    preview: string
    type?: string
    speakerId?: number
    event?: Event
    branch: RawDialogue[]
  }[]
}
