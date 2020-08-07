import React, { useState } from 'react';
import Link from 'next/link'
import { useContext } from 'react';
import UserContext from '../components/UserContext';

const Navbar = () => {
const {userFullName,signOut } = useContext(UserContext);
const [burgerState,setBurgerState]= useState(false)
const signUserOut = e =>{
  e.preventDefault();
  signOut()
}
 return(
<nav className="navbar is-spaced is-black" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="#">
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

    </div>

    <div className="navbar-end">
    <Link href='/index'>
        <a className="navbar-item" >
            Summary
          </a>
        </Link>
        <Link href='/UE'>
        <a className="navbar-item" >
            UE
          </a>
        </Link>
      <Link href='/table'>
        <a className="navbar-item" >
            Raw Data
          </a>
        </Link>
        {/* <Link href='/profile'>
        <a className="navbar-item" >
            Profile
          </a>
        </Link> */}
        <a className="navbar-item" href='http://sgpfaapps01/TPMDatabase/Checklist/MainPage'>
            New TPM Databases
        </a>
        <a className="navbar-item">
            Hello {userFullName}
        </a>
        <a className="navbar-item" onClick={signUserOut}>
           SignOut
        </a>

    </div>
  </div>
</nav>
);        
};

export default Navbar;