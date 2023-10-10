"use client"

import { createContext, useReducer } from "react";
import { GameAction, GameReducer } from "@/reducers";
import { GameState } from "@/types";
import { characters, maps } from "@/data";

const initialState: GameState = {
  characters: { 
    active: [ characters[0], characters[1], characters[2], characters[0] ],
    idle: []
  },
  currentMap: maps[0],
  events: {
    current: null,
    queued: []
  }
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
