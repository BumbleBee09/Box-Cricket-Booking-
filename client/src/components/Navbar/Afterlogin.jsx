import React from 'react'
import { NavLink } from 'react-router-dom'

const Afterlogin = () => {
  return (
    <>
      {/* <!-- Navbar --> */}
<nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
  {/* <!-- Container wrapper --> */}
  <div className="container-fluid" >
    {/* <!-- Toggle button --> */}
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <!-- Navbar brand --> */}
      <a className="navbar-brand mt-2 mt-lg-0" href="/" >
        <img
          src="Logo Box.png"
          height="50"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
      {/* <!-- Left links --> */}
      <ul className="navbar-nav">
        <li className="nav-item" style={{marginRight : "10%"}}>
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item" style={{marginRight : "10%"}}>
          <NavLink className="nav-link" to="/grounds">Grounds</NavLink>
        </li>       


      </ul>
      {/* <!-- Left links --> */}
    </div>
    {/* <!-- Collapsible wrapper --> */}

    {/* <!-- Right elements --> */}
    <div className="d-flex align-items-center" style={{marginRight : "1.5%"}}>

      {/* <!-- Notifications --> */}
      <div className="dropdown" style={{marginRight : "25%"}}>
        <NavLink
          className="text-reset me-3 dropdown-toggle hidden-arrow"
          to="/notification"
          role="button"
        >
          <i className="fas fa-bell fa-lg"></i>
        </NavLink>
      </div>
      {/* <!-- Avatar --> */}
      <div className="dropdown">
        <a
          className="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="/"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
         >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-circle"
            height="40"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <NavLink className="dropdown-item" to="/profile">My profile</NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
    {/* <!-- Right elements --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
{/* <!-- Navbar --> */}
    </>
  )
}

export default Afterlogin
