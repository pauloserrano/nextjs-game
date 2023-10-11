"use client"

import { CHARACTERS_ID, MAPS_ID, characters, maps } from "@/data";
import { useFactory, useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";
import { CombatEvent, DAYTIMES, DialogueEvent, EVENT_TYPES } from "@/types";
import { useEffect } from "react";


export default function Home() {
  const { state, actions } = useGameContext()
  const { create } = useFactory()
  const currentEvent = state.events.current

  useEffect(() => {
    actions.changeMap(maps[MAPS_ID.DEMO])
    actions.addToParty(create.characterSheet(characters[CHARACTERS_ID.HERO]))
    actions.setDaytime(DAYTIMES.MORNING)
  }, [])

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
