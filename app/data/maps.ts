import { DIALOGUE_ID, EVENT_TYPES, MAPS_ID, Map } from "@/types";
import { createEvent } from "../helpers";

const Demo: Map = {
  id: MAPS_ID.DEMO,
  name: "Demo",
  src: "/assets/images/maps/demo.png",
  actions: [
    { label: "Notice Board", event: { type: EVENT_TYPES.INTERACT, data: {} }},
    { label: "Training Grounds", event: createEvent.combat()},
    { label: "Talk to Someone", event: createEvent.dialogue(DIALOGUE_ID.INTRO)},
    { label: "Go Outside", event: createEvent.travel(MAPS_ID.OUTSIDE)},
  ]
}

const Outside: Map = {
  id: MAPS_ID.OUTSIDE,
  name: "Outside",
  src: "/assets/images/maps/outside.png",
  actions: [
    { label: "Go Inside", event: createEvent.travel(MAPS_ID.DEMO)},
  ]
}

export const maps = {
  [Demo.id]: Demo,
  [Outside.id]: Outside
}