import { TEXT_TYPE, CHARACTERS_ID, DIALOGUE_ID, RawDialogue, Dialogue, QUESTS_ID } from "@/types";
import { characters } from "@/data";
import { createEvent } from "../helpers";

function getName(id: CHARACTERS_ID): string {
  return characters[id].name
}

function formatDialogue(raw: RawDialogue[]): Dialogue {
  const hash: any = {}
  let key = 1

  for(let i = 0; i < raw.length; i++) {
    const isLast = (key === raw.length)

    hash[`KEY_${key}`] = {
      ...raw[i],
      text: raw[i].text,
      type: raw[i].type || TEXT_TYPE.SPEECH,
      next: isLast ? null : [],
    }

    const hasChoices = (raw[i].choices !== undefined)

    if (!hasChoices && !isLast) {
      hash[`KEY_${key}`].next!.push(`KEY_${++key}`)
      continue
    }

    for(let j = 0; j < raw[i].choices?.length!; j++){
      const letter = String.fromCharCode("A".charCodeAt(0) + j);
      const choice = raw[i].choices![j]
      const choiceKey = `KEY_${key}${letter}`
      
      choice.type = choice.type || TEXT_TYPE.SPEECH
      
      hash[choiceKey] = {
        ...choice,
        type: choice.type || TEXT_TYPE.SPEECH,
        next: [`KEY_${key + 1}`]
      }

      hash[`KEY_${key}`].next!.push(choiceKey)
    }
    
    key++
  }
  
  return hash
}

const intro: RawDialogue[] = [
  { 
    text: [`${getName(CHARACTERS_ID.ARION)}, wake up...`, `You're gonna be late!`], 
    speakerId: CHARACTERS_ID.ELOISE,
    event: createEvent.quest(QUESTS_ID.DEMO_001)
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
      { text: ["Oh shit! Have I overslept?"] },
      { text: ["Sure but did you really need to shout me awake?"] },
    ],
  },
  { 
    text: ["Hurry up! You have 10 minutes to get there!"], 
    speakerId: CHARACTERS_ID.ELOISE
  },
]


export const dialogues = {
  [DIALOGUE_ID.INTRO]: formatDialogue(intro),
}
