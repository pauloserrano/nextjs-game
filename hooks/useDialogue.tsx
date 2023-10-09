import { useState } from "react";
import { Dialogue } from "@/types";


export function useDialogue(dialogue: {[key: number]: Dialogue}) {
  const [step, setStep] = useState<Dialogue>(dialogue[0])

  return (
    <div>useDialogue</div>
  )
}
