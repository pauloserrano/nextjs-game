import { CHARACTERS_ID, DIALOGUE_ID, MAPS_ID, QUESTS_ID, RawDialogue, TEXT_TYPE } from "@/types";
import { characters, environments } from "@/data";
import { createEvent, rawDialogueFormatter } from "../helpers";

function getName(id: CHARACTERS_ID): string {
  return characters[id].name
}

const intro: RawDialogue[] = [
  { 
    text: [`${getName(CHARACTERS_ID.ARION)}, wake up...`, `You're gonna be late!`], 
    speakerId: CHARACTERS_ID.ELOISE,
    background: environments[MAPS_ID.LIVING_ROOM]
  },
  { text: ["...", "Just five more minutes..."] },
  { 
    text: [`WAKE... UP!!!`],
    speakerId: CHARACTERS_ID.ELOISE
  },
  { text: ["Ouch! My ears! What is the big fuss about?"] },
  { 
    text: [`It's your first day at work dummy! Have you forgotten? You're gonna run late!`],
    speakerId: CHARACTERS_ID.ELOISE,
    choices: [
      { 
        preview: "Oh shit! Have I overslept?",
        branch: [{ text: ["Thanks for waking me up, I would be in big trouble"] }]
      },
      { 
        preview: "You so loud...",
        branch: [{ text: ["Did you really have to scream? That was so unnecessary"] }]
      },
    ],
  },
  { 
    text: ["Hurry up! You have 10 minutes to get there!"], 
    speakerId: CHARACTERS_ID.ELOISE
  },
]


export const dialogues = {
  [DIALOGUE_ID.INTRO]: rawDialogueFormatter(intro),
}
