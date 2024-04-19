import React from 'react'
import TopBar from '../components/TopBar'
import Sidebar from '../components/Sidebar'
import AddEmployeePage from './addemp'
import Addraw from './addraw'
import Useraw from './useraw'

function Home() {
  return (
    <div>
        <TopBar />
      <Sidebar />
      <Useraw />
     
    </div>
  )
}

export default Home
//<AddEmployeePage /> <Addraw/>