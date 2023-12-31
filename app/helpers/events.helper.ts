import { CharacterSheet, CombatEvent, DIALOGUE_ID, DialogueEvent, EVENT_TYPES, MAPS_ID, QUESTS_ID, QuestEvent, TravelEvent } from "../types";

export const createEvent = {
  travel: (mapId: MAPS_ID): TravelEvent => ({
    type: EVENT_TYPES.TRAVEL,
    data: { mapId }
  }),
  dialogue: (dialogueId: DIALOGUE_ID): DialogueEvent => ({
    type: EVENT_TYPES.DIALOGUE,
    data: { dialogueId }
  }),
  combat: (player?: CharacterSheet[], enemy?: CharacterSheet[]): CombatEvent => ({
    type: EVENT_TYPES.COMBAT,
    data: { playerParty: player || [], enemyParty: enemy || [] }
  }),
  quest: (questId: QUESTS_ID): QuestEvent => ({
    type: EVENT_TYPES.QUEST,
    data: { questId }
  })
}