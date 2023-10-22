import { EVENT_TYPES, MAPS_ID, QUESTS_ID, Quest, TravelEvent } from "../types";
import { createEvent } from "../helpers";
import { maps } from "./maps";


const DEMO_001: Quest = {
  id: QUESTS_ID.DEMO_001,
  name: "Lorem Ispum",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem est necessitatibus repellendus dolorum consequuntur. Libero cumque aut molestias alias doloremque.",
  completed: false,
  steps: [
    { 
      description: "Travel to the Mines",
      action: {
        label: "Go to the Mines",
        location: MAPS_ID.DEMO,
        event: createEvent.travel(MAPS_ID.OUTSIDE),
      },
      trigger: {
        type: EVENT_TYPES.TRAVEL,
        condition: (event: TravelEvent) => event.data.mapId === MAPS_ID.OUTSIDE,
        callback: () => { console.log("working!") }
      },
      completed: false
    }
  ],
}

export const quests = {
  [DEMO_001.id]: DEMO_001
}