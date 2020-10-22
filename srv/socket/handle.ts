import { SvcSocket } from 'svcready'
import { write } from './send'
import { getPlayer } from './store'
import { Session, WebGameMsg } from './types'

export function onGameMsg(socket: SvcSocket, session: Session, msg: WebGameMsg) {
  if (!socket.userId) return
  switch (msg[0]) {
    case 'holder':
    case 'holder':
    case 'task':
      return

    case 'move': {
      const player = getPlayer(socket.userId!)
      if (!player || !player.lobby) return

      for (const dest of player.lobby) {
        write(dest.socket, ['moved', socket.userId, msg[1], msg[2]])
      }
    }
  }
}
