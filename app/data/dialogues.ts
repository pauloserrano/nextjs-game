import { TEXT_TYPE, CHARACTERS_ID, DIALOGUE_ID, RawDialogue, Dialogue } from "@/types";
import { characters } from "@/data";

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
  { text: [
      `${getName(CHARACTERS_ID.ARION)}, wake up...`,
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
