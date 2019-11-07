import React from 'react'
import Head from 'next/head'
// side nav
import Navbar from '../components/navbar';
import SideMenu from '../components/sideMenu';
//styling
import '../styles/styles.scss';

const Home = () => (
  <body className="site">
  <Navbar></Navbar>
  <section class="columns" >
    <div className="columns is-2 is-fullheight notification">
      <SideMenu></SideMenu>
    </div>
    {/* <div className="column">
      <SampleTable></SampleTable>
    </div> */}

  </section>
</body>
)

export default Home
