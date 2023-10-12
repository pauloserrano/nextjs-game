import { Character } from "@/types";

export enum CHARACTERS_ID {
  ARION,
  JULITH,
  ELOISE,
  AYLA,
  TALIA,
  SAMANTHA,
  AEDINA,
}

const Arion: Character = {
  id: CHARACTERS_ID.ARION,
  src: "/assets/images/characters/arion.png",
  name: "Arion",
}

const Julith: Character = {
  id: CHARACTERS_ID.JULITH,
  src: "/assets/images/characters/julith.png",
  name: "Julith",
}

const Eloise: Character = {
  id: CHARACTERS_ID.ELOISE,
  src: "/assets/images/characters/eloise.png",
  name: "Eloise",
}

const Ayla: Character = {
  id: CHARACTERS_ID.AYLA,
  src: "/assets/images/characters/ayla.png",
  name: "Ayla",
}

const Talia: Character = {
  id: CHARACTERS_ID.TALIA,
  src: "/assets/images/characters/talia.png",
  name: "Talia",
}

const Aedina: Character = {
  id: CHARACTERS_ID.AEDINA,
  src: "/assets/images/characters/aedina.png",
  name: "Eloise",
}

export const characters = {
  [Arion.id]: Arion,
  [Julith.id]: Julith,
  [Eloise.id]: Eloise,
  [Ayla.id]: Ayla,
  [Talia.id]: Talia,
  [Aedina.id]: Aedina,
}