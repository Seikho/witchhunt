import './game.scss'
import React from 'react'
import { Avatar, Pos } from './types'
import { move } from './move'
import { getKeys } from './keys'

type Props = {
  size: [number, number]
}

type State = {
  pos: [number, number]
}

export const Game: React.FC<Props> = ({ size }) => {
  const [pos, setPos] = React.useState<Pos>([0, 0])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPos((p) => move(getKeys(), p, size))
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [])

  const rows = Array.from({ length: size[1] }, (_, i) => (
    <Row key={i} id={i} width={size[0]} state={{ pos }} />
  ))

  return (
    <div className="game">
      <div className="game__grid">{...rows}</div>
    </div>
  )
}

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
  const text = id[0] === state.pos[0] && id[1] === state.pos[1] ? Avatar.Pumpkin : ''
  const mod = isVisible(state.pos, id, 3) ? 'light' : ''
  return <div className={`game__cell ${mod}`}>{text}</div>
}

function isVisible(pos: Pos, self: Pos, distance: number) {
  return Math.abs(pos[0] - self[0]) <= distance && Math.abs(pos[1] - self[1]) <= distance
}

// self: 8,8
// ref: 10,10

// ref.x - self.x = 2

// self 12,12 = -2
