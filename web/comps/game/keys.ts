import { Dir } from './types'

type Keys = { [key: string]: keyof Dir }

const keys: Keys = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  KeyW: 'up',
  KeyA: 'left',
  KeyS: 'down',
  KeyD: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
}

const state = {
  up: false,
  down: false,
  left: false,
  right: false,
}

export function getKeys() {
  return { ...state }
}

window.addEventListener('keydown', (ev) => onKey(ev.key, true))
window.addEventListener('keyup', (ev) => onKey(ev.key, false))

function onKey(key: string, next: boolean) {
  const dir = keys[key]
  if (!dir) return

  state[dir] = next
}
