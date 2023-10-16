import { EVENT_TYPES, CombatEvent, DialogueEvent, Event, TravelEvent, QuestEvent } from "@/types"
import { maps, quests } from "@/data"
import { useGameContext } from "./useGameContext"

export function useEvent() {
  const { state, actions } = useGameContext()

  const eventHandler = (event: Event) => {
    switch(event.type){
      case(EVENT_TYPES.TRAVEL):
        const { data: { mapId }} = event as TravelEvent
        return actions.setMap(maps[mapId])
      
      case(EVENT_TYPES.DIALOGUE):
        return actions.startEvent(event as DialogueEvent)

      case(EVENT_TYPES.COMBAT):
        return actions.startEvent(event as CombatEvent)
      
      case(EVENT_TYPES.QUEST):
        const { data: { questId }} = event as QuestEvent
        return actions.addQuest(quests[questId])
      
      default:
        return alert(`Event "${event.type}" has not been implemented by useEvent as of now.`)
    }
  }

  return eventHandler
}
