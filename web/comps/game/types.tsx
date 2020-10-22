import React from 'react'
import { Pos } from '../../engine'

export { Pos }

export type Dir = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

export type Player = {
  id: string
  name: string
  avatar: AvatarKind
  pos: Pos
}

export type DirRef = { [key in keyof Dir]: React.MutableRefObject<boolean> }

export type AvatarKind = keyof typeof Avatar

export const Avatar = {
  Santa: <span>&#127877;</span>,
  Pumpkin: <span>&#127875;</span>,
  BallPlayer: <span>&#9977;</span>,
  Sun: <span>&#127774;</span>,
  Sunflower: <span>&#127803;</span>,
  Cherries: <span>&#127826;</span>,
  TopHat: <span>&#127913;</span>,
  Target: <span>&#127919;</span>,
  Lifter: <span>&#127947;</span>,
  Rabbit: <span>&#128007;</span>,
  Chick: <span>&#128037;</span>,
  Mouse: <span>&#128045;</span>,
  Horse: <span>&#128052;</span>,
  Monkey: <span>&#128053;</span>,
  Panda: <span>&#128060;</span>,
  Cop: <span>&#128110;</span>,
  Baby: <span>&#128118;</span>,
  Alien: <span>&#128125;</span>,
  Smile: <span>&#128512;</span>,
  Sunglasses: <span>&#128526;</span>,
  MonkeySee: <span>&#128584;</span>,
  Robot: <span>&#129302;</span>,
  King: <span>&#129332;</span>,
  Tuxedo: <span>&#129333;</span>,
  Unicorn: <span>&#129412;</span>,
  Wizard: <span>&#129497;</span>,
  Fairy: <span>&#129498;</span>,
  Dracula: <span>&#129499;</span>,
  Genie: <span>&#129502;</span>,
  Zombie: <span>&#129503;</span>,
  Elf: <span>&#129501;</span>,
  Juggler: <span>&#129337;</span>,
}

export const avatars = Object.keys(Avatar)
