import { CombatEvent, EVENT_TYPES, MAPS_ID, QUESTS_ID, Quest, TravelEvent } from "../types";
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
      completed: false,
      action: {
        label: "Go to the Mines",
        location: MAPS_ID.DEMO,
        event: createEvent.travel(MAPS_ID.OUTSIDE),
      },
      trigger: {
        type: EVENT_TYPES.TRAVEL,
        condition: (event: TravelEvent) => event.data.mapId === MAPS_ID.OUTSIDE,
      },
    }
  ],
}


const DEMO_002: Quest = {
  id: QUESTS_ID.DEMO_002,
  name: "Combat Test",
  description: "Lorem ispum",
  completed: false,
  steps: [
    { 
      description: "Get into Combat",
      completed: false,
      trigger: {
        type: EVENT_TYPES.COMBAT,
        condition: () => true,
      },
    }
  ],
}

export const quests = {
  [DEMO_001.id]: DEMO_001,
  [DEMO_002.id]: DEMO_002,
}