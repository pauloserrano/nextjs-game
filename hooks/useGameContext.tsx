"use client"

import { useContext } from 'react'
import { GameContext } from '@/contexts'
import { GAME_REDUCER_ACTIONS } from '@/reducers'
import { CharacterSheet, DAYTIMES, Event, Map } from '@/types'


export function useGameContext() {
  const { state, dispatch }  = useContext(GameContext)

  const changeMap = (map: Map) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.CHANGE_MAP, payload: map })
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

  const setDaytime = (daytime: DAYTIMES) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.SET_DAYTIME, payload: daytime })
  }

  return { 
    state, 
    actions: {
      changeMap,
      startEvent,
      endEvent,
      addToParty,
      setDaytime
    }
  }
}
