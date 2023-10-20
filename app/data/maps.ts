import { DIALOGUE_ID, EVENT_TYPES, Environment, MAPS_ID, Map } from "@/types";
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

const LivingRoom: Environment = {
  id: MAPS_ID.LIVING_ROOM,
  name: "Living Room",
  src: "/assets/images/environments/living-room.png"
}

const Bedroom: Environment = {
  id: MAPS_ID.BEDROOM,
  name: "Bedroom",
  src: "/assets/images/environments/bedroom.png"
}

const Kitchen: Environment = {
  id: MAPS_ID.KITCHEN,
  name: "Kitchen",
  src: "/assets/images/environments/kitchen.png"
}

const Corridor: Environment = {
  id: MAPS_ID.CORRIDOR,
  name: "Corridor",
  src: "/assets/images/environments/corridor.png"
}

export const maps = {
  [Demo.id]: Demo,
  [Outside.id]: Outside,
}

export const environments = {
  [LivingRoom.id]: LivingRoom,
  [Bedroom.id]: Bedroom,
  [Kitchen.id]: Kitchen,
  [Corridor.id]: Corridor
}