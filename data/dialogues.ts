import { rawDialogue } from "@/types";
import { formatDialogue } from "@/utils";
import { CHARACTERS_ID } from "./characters";

export enum DIALOGUE_ID {
  INTRO
}

const intro: rawDialogue[] = [
  {
    text: "That was fast, you're getting good at this",
    speakerId: CHARACTERS_ID.AYLA,
    choices: [
      { text: "Well... they're not that strong, really" },
      { text: "Thanks! I've been doing this for a while by now" },
      { text: "I know, right? I'll take your job soon old man!" }
    ]
  },
  { text: "Their numbers really increased recently, huh? Well, at least you lot get to practice more." },
]


export const dialogues = {
  [DIALOGUE_ID.INTRO]: formatDialogue(intro),
}
