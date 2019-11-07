import React, { useState } from 'react';
import Link from 'next/link';
import { object } from 'prop-types';
import fetch from 'isomorphic-unfetch';

// const z='something big'
const SideMenu = (props) => {
return(
<aside className="menu colums is-fullheight" >
<ul>
     <li>{props.z}</li>
     <li>someother thing</li>
    </ul>
</aside>
);
};

SideMenu.getInitialProps = async function() {
  const res = await fetch('http://sgpatsprod01:8080/tpmtestdata');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
  z:'some really long string'
  };
}
export default SideMenu;