import { CHARACTERS_ID } from "./character.types"

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

interface DialogueChoice extends Omit<DialogueLine, "choices"> {
  preview?: string
}

export interface DialogueLine {
  text: string[]
  type: TEXT_TYPE
  speakerId?: CHARACTERS_ID
  choices?: DialogueChoice[]
  next: string[] | null
}

interface RawDialogueChoice extends Omit<RawDialogue, "choices"> {
  preview?: string
}

export interface RawDialogue {
  text: string[],
  type?: TEXT_TYPE
  speakerId?: CHARACTERS_ID,
  choices?: RawDialogueChoice[]
}
