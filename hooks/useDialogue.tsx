import { useEffect, useState } from "react";
import { Dialogue, Character } from "@/types";
import { characters } from "@/data";

interface useDialogueProps {
  script: Dialogue
  end: () => void
}

export function useDialogue({ script, end }: useDialogueProps) {
  const [dialogue, setDialogue] = useState(script["KEY_1"])
  const [speakers, setSpeakers] = useState<[Character?, Character?]>([])

  useEffect(() => console.log(dialogue), [])

  const next = (key?: number) => {
    if (dialogue.next === null) {
      return end()
    }

    const nextLine = getDialogue(key)
    setDialogue(nextLine)
  }

  const getDialogue = (key?: number) => {
    return script[dialogue.next![key || 0]]
  }

  const getSpeakers = (line: typeof dialogue) => {
    if (!line.speakerId) return undefined
    
    return characters[line.speakerId]
  }

  return {
    dialogue,
    speakers,
    next
  }
}
