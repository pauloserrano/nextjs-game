"use client"

import { useEffect } from "react";
import { CHARACTERS_ID, CombatEvent, DAYTIMES, DialogueEvent, EVENT_TYPES, MAPS_ID, QUESTS_ID, TravelEvent } from "@/types";
import { useCustomEvent, useFactory, useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";
import { characters, maps, quests } from "@/data";


export default function Home() {
  const { state, actions } = useGameContext()
  const { listen, remove } = useCustomEvent()
  const { create } = useFactory()

  useEffect(() => {
    actions.setDaytime(DAYTIMES.MORNING)
    actions.setMap(maps[MAPS_ID.DEMO])
    actions.setParty([ 
      create.characterSheet(characters[CHARACTERS_ID.ARION]),
      create.characterSheet(characters[CHARACTERS_ID.ELOISE]),
    ])

    actions.addQuest(quests[QUESTS_ID.DEMO_001])
    actions.addQuest(quests[QUESTS_ID.DEMO_002])
  }, [])

  useEffect(() => {
    // Handlers
    const travelHandler = ({ detail }: { detail: TravelEvent }) => {
      const { data: { mapId }} = detail as TravelEvent
      actions.setMap(maps[mapId])
    }

    const dialogueHandler = ({ detail: dialogue }: { detail: DialogueEvent }) => {
      actions.startEvent(dialogue)
    }
    
    const combatHandler = ({ detail: combat }: { detail: CombatEvent }) => {
      actions.startEvent(combat)
    }

    // Listeners
    listen(EVENT_TYPES.TRAVEL, travelHandler)
    listen(EVENT_TYPES.DIALOGUE, dialogueHandler)
    listen(EVENT_TYPES.COMBAT, combatHandler)

    // Cleanup
    return () => {
      remove(EVENT_TYPES.TRAVEL, travelHandler)
      remove(EVENT_TYPES.DIALOGUE, dialogueHandler)
      remove(EVENT_TYPES.COMBAT, combatHandler)
    }
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
