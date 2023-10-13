import { DIALOGUE_ID, MAPS_ID, dialogues, maps } from "@/data"
import { CombatEvent, DialogueEvent, EVENT_TYPES, Event } from "@/types"
import { useGameContext } from "./useGameContext"

export function useEvent() {
  const { state, actions } = useGameContext()

  const eventHandler = (event: Event) => {
    switch(event.type){
      case(EVENT_TYPES.TRAVEL):
        const mapId: MAPS_ID = event.contentId
        return actions.setMap(maps[mapId])
      
      case(EVENT_TYPES.DIALOGUE):
        const dialogueId: DIALOGUE_ID = event.contentId
        const dialogue: DialogueEvent = { 
          ...event, 
          content: { script: dialogues[dialogueId] }
        }
        
        return actions.startEvent(dialogue)

      case(EVENT_TYPES.COMBAT):
        const combat: CombatEvent = {
          ...event,
          content: {
            playerParty: state.characters.active,
            enemyParty: state.characters.active
          }
        }
        return actions.startEvent(combat)
      
      default:
        return alert(`Event "${event.type}" has not been implemented by useEvent as of now.`)
    }
  }

  return eventHandler
}
