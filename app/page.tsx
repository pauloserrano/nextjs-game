"use client"

import { useEffect } from "react";
import { CHARACTERS_ID, CombatEvent, DAYTIMES, DialogueEvent, EVENT_TYPES, MAPS_ID } from "@/types";
import { useFactory, useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";
import { characters, maps } from "@/data";


export default function Home() {
  const { state, actions } = useGameContext()
  const { create } = useFactory()

  useEffect(() => {
    actions.setDaytime(DAYTIMES.MORNING)
    actions.setMap(maps[MAPS_ID.DEMO])
    actions.setParty([ 
      create.characterSheet(characters[CHARACTERS_ID.ARION]),
      create.characterSheet(characters[CHARACTERS_ID.ELOISE]),
    ])
  }, [])

  switch(state.events.current?.type){
    case(EVENT_TYPES.DIALOGUE):
      return (
        <DialogueLayout 
          event={state.events.current as DialogueEvent} 
          resolve={actions.endEvent} 
        />
      )

    case(EVENT_TYPES.COMBAT):
      return (
        <CombatLayout 
          event={state.events.current as CombatEvent} 
          resolve={actions.endEvent} 
        />
      )
  }

  return (
    <OverworldLayout />
  )
}
