import { useEffect, useState } from "react";
import { Character, CHARACTERS_ID, DIALOGUE_ID } from "@/types";
import { characters, dialogues } from "@/data";

interface useDialogueProps {
  dialogueId: DIALOGUE_ID
  end: () => void
}

export function useDialogue({ dialogueId, end }: useDialogueProps) {
  const [dialogue, setDialogue] = useState(dialogues[dialogueId]["KEY_1"])
  const [textIndex, setTextIndex] = useState<number>(0)
  const [active, setActive] = useState<Character>()
  const [npc, setNpc] = useState<Character>()
  
  
  useEffect(() => {
    // SET ACTIVE PLAYER SIDE
    const currActive = getCharacterById(dialogue.speakerId || 0)
    setActive(currActive)

    // SET ACTIVE NPC SIDE
    if (currActive.id !== CHARACTERS_ID.ARION) {
      setNpc(currActive)
    }
  }, [])

  const next = (key?: number) => {
    const isLastText = (textIndex === dialogue.text.length - 1)
    
    if (dialogue.next === null && isLastText) {
      return end()
    }

    if (!isLastText) {
      return setTextIndex(prev => prev + 1)
    }

    const nextLine = getDialogueLine(key)
    const currActive = getCharacterById(nextLine.speakerId || 0)

    if (nextLine.speakerId) {
      setNpc(currActive)
    }

    setDialogue(nextLine)
    setActive(currActive)
    setTextIndex(0)
  }

  const getDialogueLine = (key?: number) => {
    return dialogues[dialogueId][dialogue.next![key || 0]]
  }

  const getCharacterById = (id: CHARACTERS_ID): Character => {
    return characters[id]
  }

  return {
    dialogue: {
      ...dialogue,
      text: dialogue.text[textIndex],
    },
    active,
    participants: { 
      controlled: getCharacterById(0), 
      npc
    },
    next
  }
}
