import { Character } from "@/types";

export enum CHARACTERS_ID {
  HERO,
  ELLA,
  JULE,
}

const Protagonist: Character = {
  id: CHARACTERS_ID.HERO,
  src: "/assets/images/characters/hero.png",
  name: "Hero",
}

const Ella: Character = {
  id: CHARACTERS_ID.ELLA,
  src: "/assets/images/characters/girl1.png",
  name: "Ella",
}

const Jule: Character = {
  id: CHARACTERS_ID.JULE,
  src: "/assets/images/characters/girl3.png",
  name: "Jule",
}

export const characters = {
  [CHARACTERS_ID.HERO]: Protagonist,
  [CHARACTERS_ID.ELLA]: Ella,
  [CHARACTERS_ID.JULE]: Jule
}