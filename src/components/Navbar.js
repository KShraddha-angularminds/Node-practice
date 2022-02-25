import React from 'react'

function Navbar({name}) {
  return (
    <div>
          <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand ">Hello {name}</span>
        </div>
    </nav>
    </div>
  )
}

export default Navbar