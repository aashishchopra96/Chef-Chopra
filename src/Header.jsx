import React from 'react'
import chef from './assets/chef.png'

const Header = () => {
  return (
    < >
        <header className='TopHeader'>
        <img src={chef} alt="chef-claude-icon" />
        <h3>Chef Claude</h3>
        </header>
    </>
  )
}

export default Header