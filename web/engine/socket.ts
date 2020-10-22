import { ApiGameMsg, ApiMsg, WebGameMsg, WebMsg } from 'srv/socket/types'
import { deregisterPlayer, registerPlayer, setPos } from './player'
import { store } from '/state'

const protocol = location.protocol === 'http:' ? 'ws' : 'wss'
const port = location.port === '1234' ? '3000' : location.port
const baseUrl = `${protocol}://${location.hostname}:${port}/ws`
let _socket = create()

export function getSocket() {
  return _socket
}

export function create() {
  const socket = new WebSocket(baseUrl)

  socket.onopen = () => {
    console.log('opened')
  }

  socket.onmessage = (ev) => {
    try {
      const payload = JSON.parse(ev.data)
      handle(payload)
    } catch (ex) {}
  }

  socket.onclose = () => {
    setTimeout(() => {
      _socket = create()
    }, 1000)
    // TODO: Restore session
  }

  return socket
}

export const webClient = {
  msg: send,
  game: write,
}

function send(payload: WebMsg) {
  _socket.send(JSON.stringify(payload))
}

function write(payload: WebGameMsg) {
  _socket.send(JSON.stringify(payload))
}

function handle(payload: ApiMsg | ApiGameMsg) {
  if (Array.isArray(payload)) {
    switch (payload[0]) {
      case 'moved':
        setPos(payload[1], [payload[2], payload[3]])
        return
    }
  }

  switch (payload.type) {
    case 'connected':
      store.dispatch({ type: 'PlayerLogin', id: payload.id })
      return

    case 'lobby-joined':
      store.dispatch({ type: 'JoinLobby', avatar: payload.avatar, lobbyId: payload.lobbyId })
      for (const player of payload.players) {
        console.log('registered', player.id)
        registerPlayer({ id: player.id, pos: [0, 0], name: '', avatar: player.avatar as any })
      }
      return

    case 'lobby-left':
      console.log('de-registered', payload.userId)
      deregisterPlayer(payload.userId)
      return
  }
}
