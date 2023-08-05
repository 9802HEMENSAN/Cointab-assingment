import React from 'react'
import { Link } from 'react-router-dom'

const UserDetails = () => {

  return (
    <div> 
        <h1>All UserDetails</h1>
        <Link to="/">
        <button>Back to Home</button>
        </Link>
    </div>
  )
}

export default UserDetails