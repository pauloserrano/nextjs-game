import { CharacterSheet, GameState } from "@/types"

export const enum GAME_REDUCER_ACTIONS {
  CHANGE_MAP,
  START_EVENT,
  END_EVENT,
  ADD_TO_PARTY,
  SET_DAYTIME,
}

export interface GameAction {
  type: GAME_REDUCER_ACTIONS, 
  payload?: any
}

export const GameReducer = (state: GameState, action: GameAction): GameState => {
  switch(action.type) {
    case(GAME_REDUCER_ACTIONS.CHANGE_MAP):
      return {
        ...state,
        currentMap: action.payload
      }

    case(GAME_REDUCER_ACTIONS.START_EVENT):
      return {
        ...state,
        events: {
          ...state.events,
          current: action.payload,
        },
      }
      
    case(GAME_REDUCER_ACTIONS.END_EVENT):
    return {
      ...state,
      events: {
        ...state.events,
        current: null
      },
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
    
    case(GAME_REDUCER_ACTIONS.SET_DAYTIME):
      const newDaytime = action.payload
      return {
        ...state,
        daytime: newDaytime
      }

    default:
      return state
  }
}
