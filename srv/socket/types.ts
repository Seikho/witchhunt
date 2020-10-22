import type { SvcSocket } from 'svcready'

export type WebGameMsg =
  | ['move', number, number]
  | ['kill', UserId]
  | ['holder', number, number]
  | ['task', ...string[]]

export type ApiGameMsg = ['moved', UserId, number, number]

export type ApiMsg =
  | { type: 'authorize'; token: string }
  | { type: 'connected'; id: string }
  | {
      type: 'lobby-joined'
      lobbyId: string
      avatar: string
      players: Array<{ id: string; avatar: string }>
    }
  | { type: 'lobby-left'; userId: string }

export type WebMsg =
  | { type: 'identity'; name: string; avatar: string }
  | { type: 'join-lobby'; lobbyId: string; players: Player[] }

export type Session = {
  id: string
  name: string
  userId: string
  lobbyId?: string
  socket: SvcSocket
}

export type UserId = string
export type LobbyId = string

export type Player = {
  id: string
  avatar: string
  socket: SvcSocket
}
