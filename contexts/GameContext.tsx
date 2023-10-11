"use client"

import { createContext, useReducer } from "react";
import { GameAction, GameReducer } from "@/reducers";
import { GameState } from "@/types";

const initialState: GameState = {
  characters: { active: [], idle: [] },
  events: { current: null, queued: [] }
}

interface GameContextState {
  state: GameState,
  dispatch: React.Dispatch<GameAction>
}

export const GameContext = createContext<GameContextState>({ state: initialState, dispatch: () => {} })

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(GameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      { children }
    </GameContext.Provider>
  )
}
