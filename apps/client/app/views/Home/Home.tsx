import React from 'react'
import { Route, Routes } from 'react-router'

const drawerWidth = 240

export interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  return (
    <div>
      <main>
        <Routes>
          <Route path={'/'} element={<div>CHANNEL</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default Home
