import { GameState } from "@/types"

export const enum GAME_REDUCER_ACTIONS {
  CHANGE_MAP,
  START_EVENT,
  END_EVENT
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

    default:
      return state
  }
}
