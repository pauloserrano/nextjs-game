import { Character } from "@/types";

export enum CHARACTERS {
  HERO,
  ELLA,
  JULE,
}

export const Protagonist: Character = {
  id: CHARACTERS.HERO,
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

export const Ella: Character = {
  id: CHARACTERS.ELLA,
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

export const Jule: Character = {
  id: CHARACTERS.JULE,
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