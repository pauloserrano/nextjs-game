import { EVENT_TYPES, Map } from "@/types";
import { DIALOGUE_ID } from "./dialogues";

export enum MAPS_ID {
  DEMO,
  OUTSIDE
}

const Demo: Map = {
  id: MAPS_ID.DEMO,
  name: "Demo",
  src: "/assets/images/maps/demo.png",
  events: [
    { name: "Notice Board", type: EVENT_TYPES.INTERACT, contentId: 0 },
    { name: "Training Grounds", type: EVENT_TYPES.COMBAT, contentId: 0 },
    { name: "Talk to Someone", type: EVENT_TYPES.DIALOGUE, contentId: DIALOGUE_ID.INTRO },
    { name: "Go Outside", type: EVENT_TYPES.TRAVEL, contentId: MAPS_ID.OUTSIDE },
  ]
}

const Outside: Map = {
  id: MAPS_ID.OUTSIDE,
  name: "Outside",
  src: "/assets/images/maps/outside.png",
  events: [
    { name: "Go Inside", type: EVENT_TYPES.TRAVEL, contentId: MAPS_ID.DEMO }
  ]
}

export const maps = {
  [MAPS_ID.DEMO]: Demo,
  [MAPS_ID.OUTSIDE]: Outside
}