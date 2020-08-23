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
    <Link href='/'>
        <a className="navbar-item" >
            Summary
          </a>
        </Link>
        <Link href='/ue'>
        <a className="navbar-item" >
            UE
          </a>
        </Link>
        <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          Overlay
        </a>

        <div className="navbar-dropdown">
        <Link href='/cavity'>
          <a className="navbar-item">
            Cavity
          </a>
          </Link>
          <Link href='/roof'>

          <a className="navbar-item">
            Roof
          </a>
          </Link>
          <Link href='/buffer'>

          <a className="navbar-item">
            Buffer
          </a>
          </Link>
          <Link href='/plate'>

          <a className="navbar-item">
            Plate
          </a>
          </Link>

        </div>
    </div>        
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

    </div>
  </div>
</nav>
);        
};

export default Navbar;