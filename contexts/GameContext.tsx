"use client"

import { createContext, useReducer } from "react";
import { GameAction, GameReducer } from "@/reducers";
import { GameState } from "@/types";
import { Demo, Ella, Jule, Outside, Protagonist } from "@/data";

const initialState: GameState = {
  characters: [ Protagonist, Ella, Jule ],
  currentMap: Outside,
  isCutscenePlaying: false
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
