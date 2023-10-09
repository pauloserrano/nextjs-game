import { DIALOGUE_ID, MAPS_ID, dialogues, maps } from "@/data"
import { DialogueEvent, EVENT_TYPES, Event } from "@/types"
import { useGameContext } from "./useGameContext"

export function useEvent() {
  const { actions } = useGameContext()

  const eventHandler = (event: Event) => {
    switch(event.type){
      case(EVENT_TYPES.TRAVEL):
        const mapId: MAPS_ID = event.contentId
        return actions.changeMap(maps[mapId])
      
      case(EVENT_TYPES.DIALOGUE):
        const dialogueId: DIALOGUE_ID = event.contentId
        const dialogue: DialogueEvent = { 
          ...event, 
          content: { script: dialogues[dialogueId] }
        }
        
        return actions.startEvent(dialogue)
      
      default:
        return actions.startEvent(event)
    }
  }

  return eventHandler
}
