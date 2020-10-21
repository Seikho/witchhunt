import { createStore } from 'typedstate'
import * as game from './game'
import * as player from './player'

const { saga, setup } = createStore('witchhunt', {
  game: game.reducer,
  player: player.reducer,
})

const { store, withDispatch, withState } = setup()

export { store, withDispatch, withState, saga }
