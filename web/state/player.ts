import chance from 'chance'
import { createReducer } from 'typedstate'

export { reducer }

const rand = chance(Math.random().toString())

type PlayerState = {
  id: string
  name: string
}

type PlayerAction =
  | { type: 'PlayerLogin' }
  | { type: 'PlayerUpdateName'; name: string }
  | { type: 'PlayerNameUpdated'; name: string }

const { reducer, handle } = createReducer<PlayerState, PlayerAction>({
  id: rand.guid(),
  name: rand.name(),
})
