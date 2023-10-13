import { TEXT_TYPE, RawDialogue } from "@/types";
import { formatDialogue, getNameById } from "@/utils";
import { CHARACTERS_ID } from "./characters";

export enum DIALOGUE_ID {
  INTRO
}

const intro: RawDialogue[] = [
  { text: [
      `${getNameById(CHARACTERS_ID.ARION)}, wake up...`,
      `This is iterating through an array of strings`,
    ], 
    speakerId: CHARACTERS_ID.AYLA
  },
  { text: [`This is a new array of strings, also a thought text`], type: TEXT_TYPE.THOUGHT },
  {
    text: ["That was fast, you're getting good at this"],
    speakerId: CHARACTERS_ID.ELOISE,
    choices: [
      { text: ["Well... they're not that strong, really..."], preview: "This is a useless preview text for this choice!" },
      { text: ["Thanks! I've been doing this for a while by now"] },
      { text: ["I know, right? I'll take your job soon old man!"] },
    ],
  },
  { text: ["Their numbers really increased recently, huh? Well, at least you lot get to practice more."] },
]


export const dialogues = {
  [DIALOGUE_ID.INTRO]: formatDialogue(intro),
}
