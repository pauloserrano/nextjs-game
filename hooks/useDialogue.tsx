import { useEffect, useState } from "react";
import { Dialogue, Character, DialogueLine } from "@/types";
import { getCharacterById } from "@/utils";

interface useDialogueProps {
  script: Dialogue
  end: () => void
}

export function useDialogue({ script, end }: useDialogueProps) {
  const [dialogue, setDialogue] = useState(script["KEY_1"])
  const [active, setActive] = useState<Character>()
  const [npc, setNpc] = useState<Character>()
  const [textIndex, setTextIndex] = useState<number>(0)
  
  useEffect(() => {
    const currActive = getCharacterById(dialogue.speakerId || 0)
    setActive(currActive)

    if (currActive.id !== 0) {
      setNpc(currActive)
    }
  }, [])

  const next = (key?: number) => {
    const isLastText = (textIndex === dialogue.text.length - 1)

    if (!isLastText) {
      return setTextIndex(prev => prev + 1)
    }
    
    if (dialogue.next === null && isLastText) {
      return end()
    }

    const nextLine = getDialogue(key)
    const currActive = getCharacterById(nextLine.speakerId || 0)

    if (nextLine.speakerId) {
      setNpc(currActive)
    }

    setDialogue(nextLine)
    setActive(currActive)
    resetTextIndex()
  }

  const getDialogue = (key?: number) => {
    return script[dialogue.next![key || 0]]
  }

  const resetTextIndex = () => {
    setTextIndex(0)
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
