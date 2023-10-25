"use client"

import { useEffect } from "react";
import { CHARACTERS_ID, CombatEvent, DAYTIMES, DialogueEvent, EVENT_TYPES, MAPS_ID, NotificationEvent, QuestEvent, TravelEvent } from "@/types";
import { useCustomEvent, useFactory, useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, Layout, OverworldLayout } from "@/layouts";
import { characters, maps, quests } from "@/data";


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
    const toastHandler = ({ detail }: { detail: NotificationEvent }) => {
      const { data: { title, description }} = detail
      console.log({toastData: { title, description }})
    }

    const travelHandler = ({ detail }: { detail: TravelEvent }) => {
      const { data: { mapId }} = detail
      actions.setMap(maps[mapId])

      const notification = { title: `Travelled to ${maps[mapId].name}` }
      dispatch(EVENT_TYPES.INTERACT, { data: notification })
    }

    const dialogueHandler = ({ detail: dialogue }: { detail: DialogueEvent }) => {
      actions.startEvent(dialogue)
    }
    
    const combatHandler = ({ detail: combat }: { detail: CombatEvent }) => {
      actions.startEvent(combat)
    }

    const questHandler = ({ detail: quest }: { detail: QuestEvent }) => {
      const { data: { questId }} = quest
      actions.addQuest(quests[questId])
    }

    listen(EVENT_TYPES.TRAVEL, travelHandler)
    listen(EVENT_TYPES.DIALOGUE, dialogueHandler)
    listen(EVENT_TYPES.COMBAT, combatHandler)
    listen(EVENT_TYPES.QUEST, questHandler)
    listen(EVENT_TYPES.INTERACT, toastHandler)

    return () => {
      remove(EVENT_TYPES.TRAVEL, travelHandler)
      remove(EVENT_TYPES.DIALOGUE, dialogueHandler)
      remove(EVENT_TYPES.COMBAT, combatHandler)
      remove(EVENT_TYPES.QUEST, questHandler)
      remove(EVENT_TYPES.INTERACT, toastHandler)
    }
  }, [])

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
