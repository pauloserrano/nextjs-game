import { useState } from "react";
import { Dialogue } from "@/types";

interface useDialogueProps {
  script: Dialogue
  onEnd: () => void
}

export function useDialogue({ script, onEnd }: useDialogueProps) {
  const [dialogue, setDialogue] = useState(script[0])

  const handleDialogue = (id?: number) => {
    if (dialogue.next === null) {
      return onEnd()
    }

    const nextIndex = dialogue.next[id || 0]

    setDialogue(() => script[nextIndex])
  }

  return {
    dialogue,
    handleDialogue
  }
}
