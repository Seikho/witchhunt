import * as React from 'react'
import { Game } from '/comps/game'
import { withState } from '/state'

export const Home = withState(
  () => ({}),
  () => {
    return (
      <div>
        <Game size={[25, 25]} />
      </div>
    )
  }
)
