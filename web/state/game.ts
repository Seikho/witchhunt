import { createReducer } from 'typedstate'
import { Avatar } from '/comps/game/types'

export { reducer }

type AvatarKind = keyof typeof Avatar

type GameAction =
  | { type: 'GameCreate' }
  | { type: 'GameStart' }
  | { type: 'GameFinish' }
  | { type: 'GameInvite'; playerId: string }
  | { type: 'JoinLobby'; lobbyId: string; avatar: string }
  | { type: 'SetAvatar'; avatar: string }

type GameState = {
  state: 'init' | 'lobby' | 'started' | 'done'
  avatar: AvatarKind
  lobbyId: string
  players: Player[]
}

type Player = {
  id: string
  name: string
  avatar: AvatarKind
}

const { reducer, handle } = createReducer<GameState, GameAction>({
  state: 'init',
  players: [],
  lobbyId: '',
  avatar: 'Chick',
})

handle('SetAvatar', (_, action) => {
  if (!isAvatar(action.avatar)) return

  return { avatar: action.avatar }
})

handle('JoinLobby', (_, action) => {
  if (!isAvatar(action.avatar)) {
    return { lobbyId: action.lobbyId }
  }

  return { lobbyId: action.lobbyId, avatar: action.avatar }
})

function isAvatar(value: string): value is AvatarKind {
  return value in Avatar
}
