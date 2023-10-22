"use client"

import { createContext, useReducer } from "react";
import { CharacterSheet, GameState } from "@/types";

export const enum GAME_REDUCER_ACTIONS {
  SET_MAP,
  START_EVENT,
  END_EVENT,
  ADD_TO_PARTY,
  SET_PARTY,
  SET_DAYTIME,
  ADD_QUEST,
  UPDATE_QUEST,
}

export interface GameAction {
  type: GAME_REDUCER_ACTIONS, 
  payload?: any
}

export const GameReducer = (state: GameState, action: GameAction): GameState => {
  switch(action.type) {
    case(GAME_REDUCER_ACTIONS.SET_MAP):
      return {
        ...state,
        currentMap: action.payload
      }

    case(GAME_REDUCER_ACTIONS.START_EVENT):
      return {
        ...state,
        event: action.payload,
      }
      
    case(GAME_REDUCER_ACTIONS.END_EVENT):
    return {
      ...state,
      event: undefined,
    }

    case(GAME_REDUCER_ACTIONS.ADD_TO_PARTY):
      const partyMember: CharacterSheet = action.payload
      return {
        ...state,
        characters: {
          ...state.characters,
          active: [...state.characters.active, partyMember]
        }
      }
    
    case(GAME_REDUCER_ACTIONS.SET_PARTY):
      const party: CharacterSheet[] = action.payload
      return {
        ...state,
        characters: {
          ...state.characters,
          active: party
        }
      }
    
    case(GAME_REDUCER_ACTIONS.SET_DAYTIME):
      const newDaytime = action.payload
      return {
        ...state,
        daytime: newDaytime
      }
    
    case(GAME_REDUCER_ACTIONS.ADD_QUEST):
      return {
        ...state,
        quests: {
          ...state.quests,
          ongoing: [...state.quests.ongoing, action.payload],
        }
      }
    
    case(GAME_REDUCER_ACTIONS.UPDATE_QUEST):
      //const quests = state.quests.filter(quest => !quest.id === action.payload.id)

      return {
        ...state,
        quests: {
          ...state.quests,
          ongoing: [...state.quests.ongoing],
        }
      }

    default:
      return state
  }
}


const initialState: GameState = {
  characters: { active: [], idle: [] },
  quests: { ongoing: [], completed: [] }
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
