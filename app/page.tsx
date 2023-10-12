"use client"

import { useEffect } from "react";
import { useFactory, useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";
import { CHARACTERS_ID, DIALOGUE_ID, MAPS_ID, characters, dialogues, maps } from "@/data";
import { CombatEvent, DAYTIMES, DialogueEvent, EVENT_TYPES } from "@/types";


export default function Home() {
  const { state, actions } = useGameContext()
  const { create } = useFactory()

  useEffect(() => {
    actions.setMap(maps[MAPS_ID.DEMO])
    actions.setParty([ create.characterSheet(characters[CHARACTERS_ID.ARION]) ])
    actions.setDaytime(DAYTIMES.MORNING)

    const demoEvent: DialogueEvent = {
      contentId: 0,
      name: "lorem ipsum",
      type: EVENT_TYPES.DIALOGUE,
      content: { script: dialogues[DIALOGUE_ID.INTRO] }
    }
    actions.startEvent(demoEvent)
  }, [])

  const currentEvent = state.events.current

  if (currentEvent === null) {
    return (
      <OverworldLayout />
    )
  }

  switch(currentEvent.type){
    case(EVENT_TYPES.DIALOGUE):
      return (
        <DialogueLayout 
          event={currentEvent as DialogueEvent} 
          resolve={actions.endEvent} 
        />
      )

    case(EVENT_TYPES.COMBAT):
      return (
        <CombatLayout 
          event={currentEvent as CombatEvent} 
          resolve={actions.endEvent} 
        />
      )
      
    default:
      break
  }
}
