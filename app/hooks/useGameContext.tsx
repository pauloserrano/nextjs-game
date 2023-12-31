"use client"

import { useContext } from 'react'
import { GameContext, GAME_REDUCER_ACTIONS } from '@/contexts'
import { CharacterSheet, DAYTIMES, DIALOGUE_ID, Event, Map, QUESTS_ID, Quest } from '@/types'

export function useGameContext() {
  const { state, dispatch }  = useContext(GameContext)

  const setMap = (map: Map) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.SET_MAP, payload: map })
  }
  
  const setDaytime = (daytime: DAYTIMES) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.SET_DAYTIME, payload: daytime })
  }

  const startEvent = (event: Event) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.START_EVENT, payload: event })
  }

  const endEvent = () => {
    dispatch({ type: GAME_REDUCER_ACTIONS.END_EVENT })
  }

  const addToParty = (character: CharacterSheet) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.ADD_TO_PARTY, payload: character })
  }

  const setParty = (party: CharacterSheet[]) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.SET_PARTY, payload: party })
  }

  const addQuest = (quest: Quest) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.ADD_QUEST, payload: quest })
  }

  const updateQuest = (quest: Quest) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.UPDATE_QUEST, payload: quest })
  }

  const completeQuest = (questId: QUESTS_ID) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.COMPLETE_QUEST, payload: questId })
  }

  const updateSeenDialogues = (dialogueId: DIALOGUE_ID) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.UPDATE_SEEN_DIALOGUES, payload: dialogueId })
  }

  return { 
    state, 
    actions: {
      setMap,
      startEvent,
      endEvent,
      addToParty,
      setParty,
      setDaytime,
      addQuest,
      updateQuest,
      completeQuest,
      updateSeenDialogues,
    }
  }
}
