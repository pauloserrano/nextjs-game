import { Dialogue, RawDialogue, TEXT_TYPE } from "../types"

export function rawDialogueFormatter(data: RawDialogue[], options?: { dialogue?: any, key?: string }): Dialogue {
  const dialogue: {[key: string]: any } = options?.dialogue || {}
  let key = options?.key || "KEY_"
  
  for(let i = 0; i < data.length; i++){
    const { choices, ...validData } = data[i]
    const dialogueKey = key + i
    const isLastLine = (i + 1 === data.length)
    
    dialogue[dialogueKey] = {
      ...validData,
      type: data[i].type || TEXT_TYPE.SPEECH,
      next: (isLastLine && !options?.key) ? null : []
    }

    if (choices){
      dialogue[dialogueKey].choices = choices?.map(choice => {
        const { branch, ...valid } = choice
        return { ...valid }
      })
    }

    if(data[i].choices === undefined) {
      const nextKey = isLastLine ? `${key.slice(0, 4)}${parseInt(key[4]) + 1}` : `${key}${i + 1}`
      
      dialogue[dialogueKey].next?.push(nextKey!)
      continue
    }

    for(let j = 0; j < data[i].choices!.length; j++) {
      const letter = String.fromCharCode("A".charCodeAt(0) + j);
      const choice = data[i].choices![j]
      const choiceKey = dialogueKey + letter

      rawDialogueFormatter(choice.branch, { dialogue, key: choiceKey })
      
      dialogue[dialogueKey].next!.push(choiceKey + 0)
    }
  }
  
  return dialogue
}
