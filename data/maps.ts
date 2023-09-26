import { Map } from "@/types";

enum MAPS {
  DEMO,
  OUTSIDE
}

export const Demo: Map = {
  id: MAPS.DEMO,
  name: "Demo",
  src: "/assets/images/maps/demo.png",
}

export const Outside: Map = {
  id: MAPS.OUTSIDE,
  name: "Outside",
  src: "/assets/images/maps/outside.png",
}