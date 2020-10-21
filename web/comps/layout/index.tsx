import './layout.scss'
import React from 'react'
import { Header } from './Header'
import { Nav } from './Nav'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Nav />
      <div className="content">{children}</div>
    </div>
  )
}
