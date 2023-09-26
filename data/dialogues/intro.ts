import { Dialogue } from "@/types";

export enum DIALOGUE {
  INTRO001,
  INTRO002A,
  INTRO002B,
  INTRO002C,
  INTRO003,
}

export const demo: {[value: string]: Dialogue} = {
  [DIALOGUE.INTRO001]: {
    text: "That was fast, you're getting good at this",
    choices: [
      { text: "Well... they're not that strong, really" },
      { text: "Thanks! I've been doing this for a while by now" },
      { text: "I know, right? I'll take your job soon old man!" }
    ],
    next: [DIALOGUE.INTRO002A, DIALOGUE.INTRO002B, DIALOGUE.INTRO002C]
  },
  [DIALOGUE.INTRO002A]: {
    text: "Still... you could barely hold a sword back then, you've improved a lot.",
    next: [DIALOGUE.INTRO003]
  },
  [DIALOGUE.INTRO002B]: {
    text: "Time flies, huh? Hard to believe it's been almost a month already.",
    next: [DIALOGUE.INTRO003]
  },
  [DIALOGUE.INTRO002C]: {
    text: "Ha! Dream on, kid.",
    next: [DIALOGUE.INTRO003]
  },
  [DIALOGUE.INTRO003]: {
    text: "Their numbers really increased recently, huh? Well, at least you lot get to practice more.",
    next: null
  }
}