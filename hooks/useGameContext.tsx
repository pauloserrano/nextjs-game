"use client"

import { useContext } from 'react'
import { GameContext } from '@/contexts'
import { GAME_REDUCER_ACTIONS } from '@/reducers'
import { Event, Map } from '@/types'


export function useGameContext() {
  const { state, dispatch }  = useContext(GameContext)

  const changeMap = (map: Map) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.CHANGE_MAP, payload: map })
  }

  const startEvent = (event: Event) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.START_EVENT, payload: event })
  }

  return { 
    state, 
    actions: {
      changeMap,
      startEvent
    }
  }
}
