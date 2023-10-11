import { rawDialogue } from "@/types";
import { CHARACTERS_ID } from "../characters";

export const intro: rawDialogue[] = [
  {
    text: "That was fast, you're getting good at this",
    speakerId: CHARACTERS_ID.ELLA,
    choices: [
      { text: "Well... they're not that strong, really" },
      { text: "Thanks! I've been doing this for a while by now" },
      { text: "I know, right? I'll take your job soon old man!" }
    ]
  },
  { text: "Their numbers really increased recently, huh? Well, at least you lot get to practice more." },
]
