import { CHARACTERS_ID } from "@/data"

export enum TEXT_TYPE {
  SPEECH = "speech",
  THOUGHT = "thought",
}

export interface Dialogue { 
  [key: string] : DialogueLine
}

export interface DialogueLine {
  text: string
  type: TEXT_TYPE
  speakerId?: CHARACTERS_ID
  choices?: Omit<DialogueLine, "choices">[]
  next: string[] | null
}

export interface rawDialogue {
  text: string,
  type?: TEXT_TYPE
  speakerId?: CHARACTERS_ID,
  choices?: Omit<rawDialogue, "choices">[]
}
