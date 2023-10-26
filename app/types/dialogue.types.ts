import { CHARACTERS_ID } from "./character.types"
import { Event } from "./event.types"
import { MAPS_ID } from "./map.types"

export const enum DIALOGUE_ID {
  INTRO = "INTRO",
  MINES = "MINES"
}

export const enum TEXT_TYPE {
  SPEECH = "speech",
  THOUGHT = "thought",
}

export interface Dialogue { 
  [key: string] : DialogueLine
}

export interface DialogueLine extends Omit<RawDialogue, "type" | "choices"> {
  type: TEXT_TYPE
  next: string[] | null
  choices?: {
    preview: string
    type: string
  }[]
}

export interface RawDialogue {
  text: string[],
  type?: TEXT_TYPE
  speakerId?: CHARACTERS_ID,
  speed?: number
  event?: Event
  backgroundId?: MAPS_ID
  choices?: {
    preview: string
    type?: TEXT_TYPE
    branch: RawDialogue[]
  }[]
}
