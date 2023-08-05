import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import UserDetails from '../Pages/UserDetails'

const  AllRoute = () => {
  return (
     <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/users" element={<UserDetails/>}></Route>
     </Routes>
  )
}

export default AllRoute