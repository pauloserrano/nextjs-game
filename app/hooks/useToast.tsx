"use client"

import { EVENT_TYPES, Event, Quest, QuestEvent, QuestStep, TravelEvent } from "../types"
import { maps, quests } from "../data"
import { useCustomEvent } from "./useCustomEvent"


export function useToast() {
  const { dispatch } = useCustomEvent()

  function getNotificationMessage(event: Event) {
    switch(event.type) {
      case(EVENT_TYPES.QUEST):
        const { data: { questId } } = event as QuestEvent
        return { message: `New Quest: ${quests[questId].name}` }
      
      case(EVENT_TYPES.QUEST_UPDATE):
        const { description } = event.data as QuestStep
        return { message: `Quest Step Completed: ${description}` }
        
      case(EVENT_TYPES.QUEST_COMPLETE):
        const { name } = event.data as Quest
        return { message: `Quest Completed: ${name}`}

      case(EVENT_TYPES.TRAVEL):
        const { data: { mapId } } = event as TravelEvent
        return { message: `Travelling to: ${maps[mapId].name}` }
      
      default:
        return { message: "Something went wrong here..." }
    }
  }
  
  function toast(event: Event) {
    dispatch(EVENT_TYPES.NOTIFICATION, getNotificationMessage(event))
  }

  return toast
}
