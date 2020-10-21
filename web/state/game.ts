import { createReducer } from 'typedstate'

export { reducer }

type GameAction =
  | { type: 'GameCreate' }
  | { type: 'GameStart' }
  | { type: 'GameFinish' }
  | { type: 'GameInvite'; playerId: string }

type GameState = {
  state: 'init' | 'lobby' | 'started' | 'done'
  playerIds: string[]
}

const { reducer, handle } = createReducer<GameState, GameAction>({ state: 'init', playerIds: [] })
