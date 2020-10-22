import * as chance from 'chance'
import { SvcSocket } from 'svcready'
import { onConnect } from '../server'
import { Session, WebGameMsg, WebMsg } from './types'
import { sessions, sockets } from './store'
import { send } from './send'
import { createLobby, joinLobby, leaveLobby } from './lobby'
import { onGameMsg } from './handle'

const rand = chance(Date.now().toString())

const LOBBY_ID = 'all'

createLobby(LOBBY_ID)

onConnect((socket) => {
  const id = rand.guid().slice(0, 7)
  sockets.push(socket)
  socket.userId = id

  const session: Session = {
    id,
    name: '',
    userId: '',
    socket,
  }

  socket.on('message', (data) => {
    const payload = JSON.parse(data.toString())
    onMessage(socket, payload)
  })

  socket.on('close', () => {
    leaveLobby(socket)
  })

  sessions.set(id, session)
  send(socket, { type: 'connected', id })
  joinLobby(socket, LOBBY_ID)
})

function onMessage(socket: SvcSocket, data: WebGameMsg | WebMsg) {
  if (!socket.userId) return
  const session = sessions.get(socket.userId)
  if (!session) return

  if (Array.isArray(data)) {
    return onGameMsg(socket, session, data)
  }

  switch (data.type) {
    case 'identity':
      session.name = data.name
      sessions.set(socket.userId, session)
      return

    case 'join-lobby': {
      joinLobby(socket, data.lobbyId)
      return
    }
  }
}
