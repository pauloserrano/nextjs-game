"use client"

import { useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";
import { CombatEvent, DialogueEvent, EVENT_TYPES, Event } from "@/types";


export default function Home() {
  const { state, actions } = useGameContext()

  const startEvent = (event: Event) => {
    actions.startEvent(event)
  }

  const currentEvent = state.events.current

  if (currentEvent === null) {
    return (
      <OverworldLayout startEvent={startEvent} />
    )
  }

  switch(currentEvent.type){
    case(EVENT_TYPES.DIALOGUE):
      return (
        <DialogueLayout 
          event={currentEvent as DialogueEvent} 
          resolve={() => {}} 
        />
      )

    case(EVENT_TYPES.COMBAT):
      return (
        <CombatLayout 
          event={currentEvent as CombatEvent} 
          resolve={() => {}} 
        />
      )

    default:
      return
  }
}
