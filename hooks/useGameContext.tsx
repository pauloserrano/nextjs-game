"use client"

import { useContext } from 'react'
import { GameContext } from '@/contexts'


export function useGameContext() {
  const { state, dispatch }  = useContext(GameContext)

  return { state, dispatch }
}
