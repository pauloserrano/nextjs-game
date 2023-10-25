"use client"

import { useEffect } from "react";
import { CHARACTERS_ID, CombatEvent, DAYTIMES, DialogueEvent, EVENT_TYPES, MAPS_ID, QuestEvent, TravelEvent } from "@/types";
import { useCustomEvent, useFactory, useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";
import { characters, maps, quests } from "@/data";
import { Toast } from "./components";


export default function Home() {
  const { state, actions } = useGameContext()
  const { dispatch, listen, remove } = useCustomEvent()
  const { create } = useFactory()

  // Temporary Setup for Testing
  useEffect(() => {
    actions.setDaytime(DAYTIMES.MORNING)
    actions.setMap(maps[MAPS_ID.DEMO])
    actions.setParty([ 
      create.characterSheet(characters[CHARACTERS_ID.ARION]),
      create.characterSheet(characters[CHARACTERS_ID.ELOISE]),
    ])
  }, [])

  // Fixed Action Listeners
  useEffect(() => {
    const travelHandler = ({ detail }: { detail: TravelEvent }) => {
      const { data: { mapId }} = detail
      actions.setMap(maps[mapId])
      dispatch(EVENT_TYPES.NOTIFICATION, { message: `[TEST] Travel to ${maps[mapId].name}` })
    }

    const dialogueHandler = ({ detail: dialogue }: { detail: DialogueEvent }) => {
      actions.startEvent(dialogue)
    }
    
    const combatHandler = ({ detail: combat }: { detail: CombatEvent }) => {
      actions.startEvent(combat)
    }

    const questHandler = ({ detail: quest }: { detail: QuestEvent }) => {
      const { data: { questId }} = quest
      const alreadyTaken = state.quests.ongoing.find(quest => quest.id === questId)
      
      if (!alreadyTaken){
        actions.addQuest(quests[questId])
        dispatch(EVENT_TYPES.NOTIFICATION, { message: `[TEST] New Quest: ${quests[questId].name}` })
      }
    }

    listen(EVENT_TYPES.TRAVEL, travelHandler)
    listen(EVENT_TYPES.DIALOGUE, dialogueHandler)
    listen(EVENT_TYPES.COMBAT, combatHandler)
    listen(EVENT_TYPES.QUEST, questHandler)

    return () => {
      remove(EVENT_TYPES.TRAVEL, travelHandler)
      remove(EVENT_TYPES.DIALOGUE, dialogueHandler)
      remove(EVENT_TYPES.COMBAT, combatHandler)
      remove(EVENT_TYPES.QUEST, questHandler)
    }
  }, [state])

  // Temporary Listeners for Quests
  useEffect(() => {
    if (state.quests.ongoing.length === 0) {
      return
    }

    const triggers: any = []

    for(let i = 0; i < state.quests.ongoing.length; i++) {
      const quest = state.quests.ongoing[i]
      const currentStep = quest.steps.find((step) => !step.completed)

      const callback = (e: any) => {
        // Check if event matches condition
        if (!currentStep?.trigger.condition(e.detail)) return
        
        // Updates the quest step accordingly
        if (currentStep.update) {
          currentStep.update(currentStep)
          
        } else {
          currentStep.completed = true
        }
        
        actions.updateQuest(quest)
        
        if (currentStep.completed && currentStep.onCompleteEvent){
          actions.startEvent(currentStep.onCompleteEvent)
        }
      }

      if (currentStep){
        listen(currentStep.trigger.type, callback)        
        triggers.push({ type: currentStep.trigger.type, callback: callback })
      }
    }
         
    return () => {
      triggers.forEach((listener: any) => {
        remove(listener.type, listener.callback)
      })
    }
  }, [state.quests.ongoing])

  return (
    <>
      <Toast />
      {state.event?.type === EVENT_TYPES.DIALOGUE && (
        <DialogueLayout 
          event={state.event as DialogueEvent} 
          resolve={actions.endEvent} 
        />
      )}
      {state.event?.type === EVENT_TYPES.COMBAT && (
        <CombatLayout 
          event={state.event as CombatEvent} 
          resolve={actions.endEvent} 
        />
      )}
      {!state.event && (
        <OverworldLayout />
      )}
    </>
  )

  switch(state.event?.type){
    case(EVENT_TYPES.DIALOGUE):
      return (
        <DialogueLayout 
          event={state.event as DialogueEvent} 
          resolve={actions.endEvent} 
        />
      )

    case(EVENT_TYPES.COMBAT):
      return (
        <CombatLayout 
          event={state.event as CombatEvent} 
          resolve={actions.endEvent} 
        />
      )
  }

  return (
    <OverworldLayout />
  )
}
