import React from 'react'
import Trigger from './Trigger'
// import Showshere from './Showshere'

const Navbar = () => {
   
  return (
    <div>
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand"><img src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" width ="100" height="50" alt=""/>alphaCoder`s</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item hvr-underline-from-center">
            <a className="nav-link" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item hvr-underline-from-center">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item hvr-underline-from-center">
            <a className="nav-link">Random Quotes</a>
          </li>
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-danger" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  {/* <Showshere /> */}
  </div>
  )
}

export default Navbar
