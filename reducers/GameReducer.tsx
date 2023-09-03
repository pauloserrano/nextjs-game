import { GameState,} from "@/types"

export const enum GAME_REDUCER_ACTIONS {
  EXAMPLE
}

export interface GameAction {
  type: GAME_REDUCER_ACTIONS, 
  payload?: any
}

export const GameReducer = (state: GameState, action: GameAction): GameState => {
  switch(action.type) {
    default:
      return state
  }
}
