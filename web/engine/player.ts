import { Pos } from './types'
import { Player } from '/comps/game/types'

export type EnginePlayer = {
  id: string
  pos: Pos
}

type LocMap = { [id: string]: Player }

const locations = new Map<string, LocMap>()
const players = new Map<string, Player>()
let grid: Array<Map<string, Player>[]> = []

export function registerPlayer(player: Player) {
  players.set(player.id, player)
  setPos(player.id, player.pos)
}

export function deregisterPlayer(id: string) {
  const player = players.get(id)
  if (!player) return

  players.delete(id)
  const loc = locations.get(pid(player.pos))
  if (!loc) return

  delete loc[id]
  locations.set(pid(player.pos), loc)
}

export function setPos(id: string, pos: Pos) {
  const player = players.get(id)
  if (!player) return

  const posId = pid(player.pos)
  const nextPosId = pid(pos)
  const prevLoc = locations.get(posId) ?? {}
  if (!prevLoc) return

  delete prevLoc[id]
  locations.set(posId, prevLoc)

  const nextLoc = locations.get(nextPosId) ?? {}
  nextLoc[id] = player
  player.pos = pos

  locations.set(nextPosId, nextLoc)
}

export function getAtPos(pos: Pos) {
  return locations.get(pid(pos)) ?? {}
}

function pid(pos: Pos) {
  return `${pos[0]}-${pos[1]}`
}

export function createGrid(size: Pos) {
  const rows = Array.from({ length: size[1] }, () => {
    const cells = Array.from({ length: size[0] }, () => new Map<string, Player>())
    return cells
  })

  grid = rows
}
