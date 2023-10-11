import { Dialogue, rawDialogue } from "@/types";
import { intro } from "./intro";

export enum DIALOGUE_ID {
  INTRO
}

const formatDialogue = (raw: rawDialogue[]): Dialogue => {
  const hash: {[key: string]: any} = {}
  let currentKey = 1

  for(let i = 0; i < raw.length; i++) {
    const isLast = currentKey === raw.length

    hash[`KEY_${currentKey}`] = {
      ...raw[i],
      next: isLast ? null : []
    }

    if (!raw[i].choices && !isLast) {
      hash[`KEY_${currentKey}`].next.push(`KEY_${currentKey + 1}`)
    
    } else {
      for(let j = 0; j < raw[i].choices?.length!; j++){
        const letter = String.fromCharCode("A".charCodeAt(0) + j);
        const choiceKey = `KEY_${currentKey}${letter}`
        
        hash[choiceKey] = {
          ...raw[i].choices![j],
          next: [`KEY_${currentKey + 1}`]
        }

        hash[`KEY_${currentKey}`].next.push(choiceKey)
      }
    }

    currentKey++
  }
  
  return hash
}

export const dialogues = {
  [DIALOGUE_ID.INTRO]: formatDialogue(intro),
}
