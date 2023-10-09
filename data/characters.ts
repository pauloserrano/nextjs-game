import { Character } from "@/types";

export enum CHARACTERS_ID {
  HERO,
  ELLA,
  JULE,
}

const Protagonist: Character = {
  id: CHARACTERS_ID.HERO,
  name: "Hero",
  src: "/assets/images/characters/hero.png",
  skills: [{ name: "Example", description: "Lorem Ipsum" }],
  stats: {
    health: { current: 2000, max: 3000 },
    mana: { current: 100, max: 100 },
    speed: 10,
    strength: 10
  },
  xp: 0
}

const Ella: Character = {
  id: CHARACTERS_ID.ELLA,
  src: "/assets/images/characters/girl1.png",
  name: "Ella",
  skills: [{ name: "Example2", description: "Lorem Ipsum" }],
  stats: {
    health: { current: 1800, max: 2500 },
    mana: { current: 100, max: 100 },
    speed: 10,
    strength: 10
  },
  xp: 0
}

const Jule: Character = {
  id: CHARACTERS_ID.JULE,
  name: "Jule",
  src: "/assets/images/characters/girl3.png",
  skills: [{ name: "Example4", description: "Lorem Ipsum" }],
  stats: {
    health: { current: 2000, max: 2000 },
    mana: { current: 100, max: 100 },
    speed: 10,
    strength: 10
  },
  xp: 0,
}

export const characters = {
  [CHARACTERS_ID.HERO]: Protagonist,
  [CHARACTERS_ID.ELLA]: Ella,
  [CHARACTERS_ID.JULE]: Jule
}