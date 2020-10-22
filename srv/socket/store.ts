import { SvcSocket } from 'svcready'
import { LobbyId, Player, Session, UserId } from './types'

export const sockets: SvcSocket[] = []
export const sessions = new Map<UserId, Session>()
export const lobbies = new Map<LobbyId, Player[]>()

export function getPlayer(id: string) {
  const session = sessions.get(id)
  if (!session) return

  if (!session.lobbyId) return { session }

  const lobby = lobbies.get(session.lobbyId)
  return { session, lobby }
}

export function getSession(id: string) {
  return sessions.get(id)
}

export function getLobby(id: string) {
  return lobbies.get(id)
}
