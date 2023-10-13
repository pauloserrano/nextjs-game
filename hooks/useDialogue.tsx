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
  const [textIndex, setTextIndex] = useState<number>(0)

  useEffect(() => {
    setActive(getActive(dialogue))
  }, [])

  const next = (key?: number) => {
    if (dialogue.next === null) {
      return end()
    }

    const nextLine = getDialogue(key)
    setDialogue(nextLine)
    setActive(getActive(nextLine))
  }

  const getDialogue = (key?: number) => {
    return script[dialogue.next![key || 0]]
  }

  const getActive = (line: DialogueLine) => {
    return getCharacterById(line.speakerId || 0)
  }

  const resetTextIndex = () => {
    setTextIndex(0)
  }

  return {
    dialogue,
    active,
    next
  }
}
