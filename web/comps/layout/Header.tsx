import './header.scss'
import React from 'react'
import { withState } from '/state'

export const Header = withState(
  ({ player }) => ({ name: player.name }),
  ({ name }) => (
    <header className="header">
      <div className="header__left">LOGO</div>
      <div className="header__mid">
        <div className="badge">Witchhunt</div>
      </div>
      <div className="header__right">{name}</div>
    </header>
  )
)
