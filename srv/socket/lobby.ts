import { SvcSocket } from 'svcready'
import { send } from './send'
import { getLobby, getPlayer, getSession, lobbies, sessions } from './store'
import { Player } from './types'

export function createLobby(lobbyId: string) {
  const existing = getLobby(lobbyId)
  if (existing) return

  lobbies.set(lobbyId, [])
}

export function joinLobby(socket: SvcSocket, lobbyId: string) {
  if (!socket.userId) return

  const session = getSession(socket.userId)
  if (!session) return

  const lobby = getLobby(lobbyId)
  if (!lobby) return

  if (lobby.some((player) => player.id === socket.userId)) {
    return
  }

  const chosenAvatars = lobby.map((player) => player.avatar)
  const avatar = getRandomAvatar(chosenAvatars)
  session.lobbyId = lobbyId
  sessions.set(socket.userId, session)

  lobby.push({ id: socket.userId, avatar, socket })
  for (const member of lobby) {
    send(member.socket, { type: 'lobby-joined', avatar, lobbyId, players: lobby.map(toWebLobby) })
  }
}

export function leaveLobby(socket: SvcSocket) {
  if (!socket.userId) return
  const player = getPlayer(socket.userId)
  if (!player || !player.lobby) return

  const nextLobby = player.lobby.filter((entry) => entry.id !== socket.userId)
  lobbies.set(player.session.lobbyId!, nextLobby)
  for (const member of nextLobby) {
    send(member.socket, { type: 'lobby-left', userId: socket.userId })
  }
}

function getRandomAvatar(selected: string[]) {
  const filtered = avatars.filter((name) => !selected.includes(name))
  const index = Math.floor(Math.random() * filtered.length)

  return filtered[index]
}

function toWebLobby(player: Player) {
  return { id: player.id, avatar: player.avatar }
}

const avatars = [
  'Santa',
  'Pumpkin',
  'BallPlayer',
  'Sun',
  'Sunflower',
  'Cherries',
  'TopHat',
  'Target',
  'Lifter',
  'Rabbit',
  'Chick',
  'Mouse',
  'Horse',
  'Monkey',
  'Panda',
  'Cop',
  'Baby',
  'Alien',
  'Smile',
  'Sunglasses',
  'MonkeySee',
  'Robot',
  'King',
  'Tuxedo',
  'Unicorn',
  'Wizard',
  'Fairy',
  'Dracula',
  'Genie',
  'Zombie',
  'Elf',
  'Juggler',
]
