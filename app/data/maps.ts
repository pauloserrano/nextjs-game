import { DIALOGUE_ID, EVENT_TYPES, MAPS_ID, Map } from "@/types";
import { createEvent } from "../helpers";

const Demo: Map = {
  id: MAPS_ID.DEMO,
  name: "Living Room",
  src: "/assets/images/maps/living-room.png",
  actions: [
    { label: "Training Grounds", event: createEvent.combat()},
    { label: "Talk to Someone", event: createEvent.dialogue(DIALOGUE_ID.INTRO)},
    { label: "Go Outside", event: createEvent.travel(MAPS_ID.OUTSIDE)},
  ]
}

const Outside: Map = {
  id: MAPS_ID.OUTSIDE,
  name: "Corridor",
  src: "/assets/images/maps/corridor.png",
  actions: [
    { label: "Notice Board", event: { type: EVENT_TYPES.INTERACT, data: {} }},
    { label: "Go Inside", event: createEvent.travel(MAPS_ID.DEMO)},
  ]
}

const Mines: Map = {
  id: MAPS_ID.MINES,
  name: "Mines",
  src: "/assets/images/maps/demo.png",
  actions: [
    { label: "Go Back", event: createEvent.travel(MAPS_ID.DEMO)},
  ]
}

const LivingRoom: Map = {
  id: MAPS_ID.LIVING_ROOM,
  name: "Living Room",
  src: "/assets/images/maps/living-room.png"
}

const Bedroom: Map = {
  id: MAPS_ID.BEDROOM,
  name: "Bedroom",
  src: "/assets/images/maps/bedroom.png"
}

const Kitchen: Map = {
  id: MAPS_ID.KITCHEN,
  name: "Kitchen",
  src: "/assets/images/maps/kitchen.png"
}

const Corridor: Map = {
  id: MAPS_ID.CORRIDOR,
  name: "Corridor",
  src: "/assets/images/maps/corridor.png"
}

export const maps = {
  [Demo.id]: Demo,
  [Outside.id]: Outside,
  [Mines.id]: Mines,
  [LivingRoom.id]: LivingRoom,
  [Bedroom.id]: Bedroom,
  [Kitchen.id]: Kitchen,
  [Corridor.id]: Corridor,
}
