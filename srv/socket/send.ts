import { SvcSocket } from 'svcready'
import { ApiGameMsg, ApiMsg } from './types'

export function send(socket: SvcSocket, payload: ApiMsg) {
  socket.send(JSON.stringify(payload))
}

export function write(socket: SvcSocket, payload: ApiGameMsg) {
  socket.send(JSON.stringify(payload))
}
