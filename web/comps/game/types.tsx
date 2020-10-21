import React from 'react'

export type Dir = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

export type DirRef = { [key in keyof Dir]: React.MutableRefObject<boolean> }

export const Avatar = {
  Santa: <span>&#127877;</span>,
  Pumpkin: <span>&#127875;</span>,
}

export type Pos = [number, number]
