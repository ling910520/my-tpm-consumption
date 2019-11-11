import React, { useState } from 'react';
import Link from 'next/link'

const Navbar = () => {

const [burgerState,setBurgerState]= useState(false);
 return(
<nav className="navbar is-spaced is-black" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
        <img src="/imageedit_19_5338153406.png" width="112" height="28" alt="skyworkslogo"/>
    </a>

    <a role="button" className={`navbar-burger burger ${burgerState ?'is-active':''}`} aria-label="menu" aria-expanded="false" 
        data-target="navbarBasicExample" onClick={() =>setBurgerState(!burgerState)} href='###'>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" className={`navbar-menu ${burgerState ?'is-active':''}`} >
    <div className="navbar-start">
      <Link href='/'>
        <a className="navbar-item" >
            Home
          </a>
        </Link>
         
      <a className="navbar-item" href='###'>
        Documentation
      </a>
      <Link href='/table'>
        <a className="navbar-item" >
            Table
          </a>
        </Link>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary" href='###'>
            <strong>Sign up</strong>
          </a>
          <a className="button is-light" href='###'>
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
);        
};

export default Navbar;