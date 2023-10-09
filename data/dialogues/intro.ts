import { Dialogue } from "@/types";
import { CHARACTERS_ID } from "../characters";

enum DIALOGUE_KEY {
  INTRO001,
  INTRO002A,
  INTRO002B,
  INTRO002C,
  INTRO003,
}

export const Intro: Dialogue = {
  [DIALOGUE_KEY.INTRO001]: {
    text: "That was fast, you're getting good at this",
    speakerId: CHARACTERS_ID.ELLA,
    choices: [
      { text: "Well... they're not that strong, really" },
      { text: "Thanks! I've been doing this for a while by now" },
      { text: "I know, right? I'll take your job soon old man!" }
    ],
    next: [DIALOGUE_KEY.INTRO002A, DIALOGUE_KEY.INTRO002B, DIALOGUE_KEY.INTRO002C]
  },
  [DIALOGUE_KEY.INTRO002A]: {
    text: "Still... you could barely hold a sword back then, you've improved a lot.",
    next: [DIALOGUE_KEY.INTRO003]
  },
  [DIALOGUE_KEY.INTRO002B]: {
    text: "Time flies, huh? Hard to believe it's been almost a month already.",
    next: [DIALOGUE_KEY.INTRO003]
  },
  [DIALOGUE_KEY.INTRO002C]: {
    text: "Ha! Dream on, kid.",
    next: [DIALOGUE_KEY.INTRO003]
  },
  [DIALOGUE_KEY.INTRO003]: {
    text: "Their numbers really increased recently, huh? Well, at least you lot get to practice more.",
    next: null
  }
}