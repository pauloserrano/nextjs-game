"use client"

import { useContext } from 'react'
import { GameContext } from '@/contexts'
import { GAME_REDUCER_ACTIONS } from '@/reducers'
import { Map } from '@/types'


export function useGameContext() {
  const { state, dispatch }  = useContext(GameContext)

  const handleMapChange = (map: Map) => {
    dispatch({ type: GAME_REDUCER_ACTIONS.CHANGE_MAP, payload: map})
  }

  return { 
    state, 
    actions: {
      handleMapChange
    }
  }
}
