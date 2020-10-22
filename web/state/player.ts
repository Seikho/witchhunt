import chance from 'chance'
import { createReducer } from 'typedstate'

export { reducer }

const rand = chance(Math.random().toString())

type PlayerState = {
  id: string
  name: string
}

type PlayerAction =
  | { type: 'PlayerLogin'; id: string }
  | { type: 'PlayerUpdateName'; name: string }
  | { type: 'PlayerNameUpdated'; name: string }

const { reducer, handle } = createReducer<PlayerState, PlayerAction>({
  id: '',
  name: rand.name(),
})

handle('PlayerLogin', (_, action) => {
  return { id: action.id }
})
