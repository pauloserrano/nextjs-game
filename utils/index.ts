import { CHARACTERS_ID, characters } from "@/data"
import { Character, Dialogue, TEXT_TYPE, RawDialogue } from "@/types"


export const getNameById = (id: CHARACTERS_ID): string => {
  return characters[id].name
}

export const getCharacterById = (id: CHARACTERS_ID): Character => {
  return characters[id]
}

export const formatDialogue = (raw: RawDialogue[]): Dialogue => {
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
  
  console.log(hash)
  return hash
}
