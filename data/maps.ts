import { Map } from "@/types";

enum MAPS {
  DEMO,
  OUTSIDE
}

export const MAP_ACTION_TYPES = {
  TALK: "talk",
  INTERACT: "interact",
  WALK: "walk"
}

export const Demo: Map = {
  id: MAPS.DEMO,
  name: "Demo",
  src: "/assets/images/maps/demo.png",
  actions: [
    { name: "Notice Board", type: MAP_ACTION_TYPES.INTERACT, event: "" },
    { name: "Talk to Someone", type: MAP_ACTION_TYPES.TALK, event: "" },
    { name: "Go Outside", type: MAP_ACTION_TYPES.WALK, event: "" },
  ]
}

export const Outside: Map = {
  id: MAPS.OUTSIDE,
  name: "Outside",
  src: "/assets/images/maps/outside.png",
  actions: [
    { name: "Go Inside", type: MAP_ACTION_TYPES.WALK, event: "" }
  ]
}