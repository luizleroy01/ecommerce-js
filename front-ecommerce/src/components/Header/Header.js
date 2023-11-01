import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <h1>Eccomerce</h1>
        <div class="divLogin">
            <Link to='/login'>Login</Link>
        </div>
    </header>
  )
}

export default Header