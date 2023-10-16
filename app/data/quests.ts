import { MAPS_ID, QUESTS_ID, Quest } from "../types";
import { createEvent } from "../helpers";
import { maps } from "./maps";


const DEMO_001: Quest = {
  id: QUESTS_ID.DEMO_001,
  name: "Go to work!",
  description: "lorem ipsum",
  actions: [
    { 
      label: "Go to the Mines",
      map: maps[MAPS_ID.DEMO], 
      event: createEvent.travel(MAPS_ID.OUTSIDE),
    }
  ],
  isCompleted: false
}

export const quests = {
  [DEMO_001.id]: DEMO_001
}