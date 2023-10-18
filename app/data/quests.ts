import { MAPS_ID, QUESTS_ID, Quest } from "../types";
import { createEvent } from "../helpers";
import { maps } from "./maps";


const DEMO_001: Quest = {
  id: QUESTS_ID.DEMO_001,
  name: "Go to work!",
  description: "lorem ipsum",
  isCompleted: false,
  steps: [
    { 
      description: "Travel to the Mines",
      actions: [
        {
          label: "Go to the Mines",
          location: maps[MAPS_ID.DEMO], 
          event: createEvent.travel(MAPS_ID.OUTSIDE),
        }
      ],
      isCompleted: false
    }
  ],
}

const DEMO_002: Quest = {
  id: QUESTS_ID.DEMO_002,
  name: "Something else",
  description: "lorem ipsum",
  isCompleted: false,
  steps: [
    { 
      description: "IDK",
      actions: [
        {
          label: "???",
          location: maps[MAPS_ID.OUTSIDE], 
          event: createEvent.travel(MAPS_ID.DEMO),
        }
      ],
      isCompleted: false
    }
  ],
}

export const quests = {
  [DEMO_001.id]: DEMO_001,
  [DEMO_002.id]: DEMO_002
}