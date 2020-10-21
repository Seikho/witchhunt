import { Dir, Pos } from './types'

export function move(dir: Dir, pos: Pos, bounds: Pos): Pos {
  let [x, y] = pos
  const [w, h] = bounds

  if (dir.left) --x
  if (dir.right) ++x
  if (dir.up) --y
  if (dir.down) ++y

  if (x < 0 || x === w) x = pos[0]
  if (y < 0 || y === h) y = pos[1]

  return [x, y]
}
