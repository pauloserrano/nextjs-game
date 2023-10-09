import { Intro } from "./intro";

export enum DIALOGUE_ID {
  INTRO
}

export const dialogues = {
  [DIALOGUE_ID.INTRO]: Intro
}