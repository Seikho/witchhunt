import * as React from 'react'
import { withState } from '/state'

export const Home = withState(
  () => ({}),
  () => {
    return <div>Home</div>
  }
)
