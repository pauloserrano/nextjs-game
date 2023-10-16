"use client"

import { useContext } from 'react'
import { GameContext, GAME_REDUCER_ACTIONS } from '@/contexts'
import { CharacterSheet, DAYTIMES, Event, Map, Quest } from '@/types'

export function useGameContext() {
  const { state, dispatch }  = useContext(GameContext)

  const setMap = (map: Map) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.SET_MAP, payload: map })
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

  const setDaytime = (daytime: DAYTIMES) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.SET_DAYTIME, payload: daytime })
  }

  const addQuest = (quest: Quest) => {
    const knownQuests = state.quests.find(known => known === quest)
    
    if (!knownQuests) {
      dispatch({ type: GAME_REDUCER_ACTIONS.ADD_QUEST, payload: quest })
    }
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
      addQuest
    }
  }
}
