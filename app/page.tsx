"use client"

import { useEffect } from "react";
import { CHARACTERS_ID, CombatEvent, DAYTIMES, DialogueEvent, EVENT_TYPES, Event, MAPS_ID, QuestEvent, QuestStep, TravelEvent } from "@/types";
import { useCustomEvent, useFactory, useGameContext } from "@/hooks";
import { CombatLayout, DialogueLayout, OverworldLayout } from "@/layouts";
import { characters, maps, quests } from "@/data";
import { useToast } from "./hooks/useToast";


export default function Home() {
  const { state, actions } = useGameContext()
  const { listen, remove } = useCustomEvent()
  const { create } = useFactory()
  const toast = useToast()

  function getNotificationMessage(event: Event) {
    switch(event.type) {
      case(EVENT_TYPES.QUEST):
        const { data: { questId } } = event as QuestEvent
        return { message: `[TEST] New Quest: ${quests[questId].name}` }
      
      case(EVENT_TYPES.QUEST_UPDATE):
        const description = event.data as string
        return { message: `[TEST] Completed: ${description}` }

      case(EVENT_TYPES.TRAVEL):
        const { data: { mapId } } = event as TravelEvent
        return { message: `[TEST] Travelling to: ${maps[mapId].name}` }
      
      default:
        return { message: "Something went wrong here..." }
    }
  }

  // Temporary State Filler for Development
  // TODO: Implement [Save / Load]
  useEffect(() => {
    actions.setDaytime(DAYTIMES.MORNING)
    actions.setMap(maps[MAPS_ID.DEMO])
    actions.setParty([ 
      create.characterSheet(characters[CHARACTERS_ID.ARION]),
      create.characterSheet(characters[CHARACTERS_ID.ELOISE]),
    ])
  }, [])

  // Default Action Listeners
  useEffect(() => {
    const travelHandler = ({ detail }: { detail: TravelEvent }) => {
      const { data: { mapId }} = detail
      actions.setMap(maps[mapId])
      toast(detail)
    }

    const dialogueHandler = ({ detail: dialogue }: { detail: DialogueEvent }) => {
      actions.startEvent(dialogue)
    }
    
    const combatHandler = ({ detail: combat }: { detail: CombatEvent }) => {
      actions.startEvent(combat)
    }

    const questHandler = ({ detail: quest }: { detail: QuestEvent }) => {
      const { data: { questId }} = quest
      const alreadyTaken = state.quests.find(quest => quest.id === questId)
      
      if (!alreadyTaken){
        actions.addQuest(quests[questId])
        toast(quest)
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
    if (state.quests.length === 0) {
      return
    }

    const triggers: any = []

    for(let i = 0; i < state.quests.length; i++) {
      const quest = state.quests[i]
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
          toast({ type: EVENT_TYPES.QUEST_UPDATE, data: currentStep })
        }

        const lastStep = quest.steps[quest.steps.length - 1]
        if (lastStep.completed){
          actions.completeQuest(quest.id)
          toast({ type: EVENT_TYPES.QUEST_COMPLETE, data: quest })
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
  }, [state.quests])

  switch(state.event?.type){
    case(EVENT_TYPES.DIALOGUE):
      const dialogueEvent = state.event as DialogueEvent
      
      return (
        <DialogueLayout 
          event={dialogueEvent} 
          resolve={() => {
            actions.updateSeenDialogues(dialogueEvent.data.dialogueId)
            actions.endEvent()
          }} 
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
