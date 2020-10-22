import './game.scss'
import React from 'react'
import { Avatar, AvatarKind, Player, Pos } from './types'
import { move } from './move'
import { getKeys } from './keys'
import { withState } from '/state'
import { getAtPos, webClient } from '/engine'

type Props = {
  size: [number, number]
}

type State = {
  pos: [number, number]
  avatar: AvatarKind
  playerId: string
}

export const Game: React.FC<Props> = withState(
  ({ game, player }) => ({ avatar: game.avatar, playerId: player.id }),
  ({ size, avatar, playerId }) => {
    const [pos, setPos] = React.useState<Pos>([0, 0])
    const [, setTick] = React.useState(0)

    React.useEffect(() => {
      const interval = setInterval(() => {
        setTick((tick) => tick + 1)
        setPos((p) => {
          const nextPos = move(getKeys(), p, size)
          if (nextPos[0] === p[0] && nextPos[1] === p[1]) return p
          webClient.game(['move', nextPos[0], nextPos[1]])
          return nextPos
        })
      }, 1000 / 30)

      return () => clearInterval(interval)
    }, [])

    const rows = Array.from({ length: size[1] }, (_, i) => (
      <Row key={i} id={i} width={size[0]} state={{ pos, avatar, playerId }} />
    ))

    return (
      <div className="game">
        <div className="game__grid">{...rows}</div>
      </div>
    )
  }
)

type RowProps = {
  id: number
  width: number
  state: State
}

const Row: React.FC<RowProps> = ({ id, width, state }) => {
  const cells = Array.from({ length: width }, (_, i) => (
    <Cell key={`${id}-${i}`} id={[i, id]} state={state} />
  ))
  return (
    <div className="game__row" key={id}>
      {...cells}
    </div>
  )
}

type CellProps = { id: [number, number]; state: State }
const Cell: React.FC<CellProps> = ({ state, id }) => {
  const atPos = getAtPos(id)
  const values = Object.values(atPos)
  const mod = isVisible(state.pos, id, 3) ? 'light' : ''
  return <div className={`game__cell ${mod}`}>{...values.map(toAvatar)}</div>
}

function isVisible(pos: Pos, self: Pos, distance: number) {
  return Math.abs(pos[0] - self[0]) <= distance && Math.abs(pos[1] - self[1]) <= distance
}

function toAvatar(player: Player) {
  return <React.Fragment key={player.id}>{Avatar[player.avatar]}</React.Fragment>
}
